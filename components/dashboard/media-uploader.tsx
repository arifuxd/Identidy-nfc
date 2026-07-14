"use client";

import Image from "next/image";
import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { LoaderCircle, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface MediaUploaderProps {
  bucket: "avatars" | "covers";
  label: string;
  userId: string;
  value?: string | null;
  onChange: (url: string) => void;
}

type CropRect = { x: number; y: number; width: number; height: number };
type ImageBounds = { x: number; y: number; width: number; height: number };
type ResizeHandle = "nw" | "ne" | "sw" | "se";
type InteractionState =
  | { mode: "move"; offsetX: number; offsetY: number }
  | { mode: "resize"; handle: ResizeHandle; startX: number; startY: number; startRect: CropRect }
  | null;

export function MediaUploader({ bucket, label, userId, value, onChange }: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const interactionRef = useRef<InteractionState>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draftFileName, setDraftFileName] = useState<string | null>(null);
  const [draftDataUrl, setDraftDataUrl] = useState<string | null>(null);
  const [cropRect, setCropRect] = useState<CropRect | null>(null);
  const [imageBounds, setImageBounds] = useState<ImageBounds | null>(null);

  const aspectRatio = bucket === "avatars" ? 1 : 16 / 6;

  const closeModal = () => {
    setDraftDataUrl(null);
    setDraftFileName(null);
    setCropRect(null);
    setImageBounds(null);
    interactionRef.current = null;
    if (inputRef.current) inputRef.current.value = "";
  };

  const initializeCropRect = (bounds: ImageBounds, preserveCenter = false) => {
    let width = bounds.width * 0.7;
    let height = width / aspectRatio;
    if (height > bounds.height * 0.85) {
      height = bounds.height * 0.85;
      width = height * aspectRatio;
    }

    const centerX =
      preserveCenter && cropRect ? cropRect.x + cropRect.width / 2 : bounds.x + bounds.width / 2;
    const centerY =
      preserveCenter && cropRect ? cropRect.y + cropRect.height / 2 : bounds.y + bounds.height / 2;

    const x = Math.max(bounds.x, Math.min(bounds.x + bounds.width - width, centerX - width / 2));
    const y = Math.max(bounds.y, Math.min(bounds.y + bounds.height - height, centerY - height / 2));
    setCropRect({ x, y, width, height });
  };

  const selectionStyle = useMemo(() => {
    if (!cropRect) return {};
    return {
      left: `${cropRect.x}px`,
      top: `${cropRect.y}px`,
      width: `${cropRect.width}px`,
      height: `${cropRect.height}px`,
    };
  }, [cropRect]);

  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      setDraftFileName(file.name);
      setDraftDataUrl(String(reader.result));
      setCropRect(null);
      setImageBounds(null);
    };
    reader.onerror = () => setError("Could not read the selected image.");
    reader.readAsDataURL(file);
  };

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!cropRect) return;
    const stage = stageRef.current;
    if (!stage) return;
    const stageBounds = stage.getBoundingClientRect();
    const pointerX = event.clientX - stageBounds.left;
    const pointerY = event.clientY - stageBounds.top;
    const target = event.target as HTMLElement;
    const resizeHandle = target.dataset.handle as ResizeHandle | undefined;

    if (resizeHandle) {
      interactionRef.current = {
        mode: "resize",
        handle: resizeHandle,
        startX: event.clientX,
        startY: event.clientY,
        startRect: cropRect,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }

    if (
      pointerX < cropRect.x ||
      pointerX > cropRect.x + cropRect.width ||
      pointerY < cropRect.y ||
      pointerY > cropRect.y + cropRect.height
    ) {
      return;
    }
    interactionRef.current = {
      mode: "move",
      offsetX: pointerX - cropRect.x,
      offsetY: pointerY - cropRect.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!interactionRef.current) return;
    event.preventDefault();
    if (!cropRect || !imageBounds) return;
    const stage = stageRef.current;
    if (!stage) return;
    const stageBounds = stage.getBoundingClientRect();
    const pointerX = event.clientX - stageBounds.left;
    const pointerY = event.clientY - stageBounds.top;

    if (interactionRef.current?.mode === "resize") {
      const { handle, startX, startY, startRect } = interactionRef.current;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      const minWidth = 80;
      const minHeight = minWidth / aspectRatio;

      const widthFromHorizontal = handle === "ne" || handle === "se" ? startRect.width + dx : startRect.width - dx;
      const heightFromVertical = handle === "se" || handle === "sw" ? startRect.height + dy : startRect.height - dy;

      let nextWidth = Math.max(minWidth, Math.max(widthFromHorizontal, heightFromVertical * aspectRatio));
      let nextHeight = nextWidth / aspectRatio;

      const anchorX = handle === "nw" || handle === "sw" ? startRect.x + startRect.width : startRect.x;
      const anchorY = handle === "nw" || handle === "ne" ? startRect.y + startRect.height : startRect.y;

      let nextX = handle === "nw" || handle === "sw" ? anchorX - nextWidth : anchorX;
      let nextY = handle === "nw" || handle === "ne" ? anchorY - nextHeight : anchorY;

      if (nextX < imageBounds.x) {
        nextX = imageBounds.x;
        nextWidth = anchorX - nextX;
        nextHeight = nextWidth / aspectRatio;
      }
      if (nextY < imageBounds.y) {
        nextY = imageBounds.y;
        nextHeight = anchorY - nextY;
        nextWidth = nextHeight * aspectRatio;
      }
      if (nextX + nextWidth > imageBounds.x + imageBounds.width) {
        nextWidth = imageBounds.x + imageBounds.width - nextX;
        nextHeight = nextWidth / aspectRatio;
      }
      if (nextY + nextHeight > imageBounds.y + imageBounds.height) {
        nextHeight = imageBounds.y + imageBounds.height - nextY;
        nextWidth = nextHeight * aspectRatio;
      }

      if (nextWidth >= minWidth && nextHeight >= minHeight) {
        setCropRect({ x: nextX, y: nextY, width: nextWidth, height: nextHeight });
      }
      return;
    }

    if (interactionRef.current?.mode === "move") {
      const { offsetX, offsetY } = interactionRef.current;
      const nextX = Math.max(
        imageBounds.x,
        Math.min(imageBounds.x + imageBounds.width - cropRect.width, pointerX - offsetX),
      );
      const nextY = Math.max(
        imageBounds.y,
        Math.min(imageBounds.y + imageBounds.height - cropRect.height, pointerY - offsetY),
      );
      setCropRect({ ...cropRect, x: nextX, y: nextY });
    }
  };

  const handlePointerUp: React.PointerEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    interactionRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleUploadClick = async () => {
    if (!imageRef.current || !cropRect || !draftFileName || !imageBounds) return;
    setError(null);
    setIsUploading(true);
    try {
      const sourceImage = imageRef.current;
      const naturalW = sourceImage.naturalWidth;
      const naturalH = sourceImage.naturalHeight;
      const displayedW = imageBounds.width;
      const displayedH = imageBounds.height;
      const scaleX = naturalW / displayedW;
      const scaleY = naturalH / displayedH;

      const sx = Math.max(0, (cropRect.x - imageBounds.x) * scaleX);
      const sy = Math.max(0, (cropRect.y - imageBounds.y) * scaleY);
      const sw = Math.min(naturalW - sx, cropRect.width * scaleX);
      const sh = Math.min(naturalH - sy, cropRect.height * scaleY);

      const sourceCropWidth = Math.max(1, Math.round(sw));
      const sourceCropHeight = Math.max(1, Math.round(sh));
      const targetMaxHeight = 300;
      const targetMaxWidth = bucket === "avatars" ? 300 : Math.round(targetMaxHeight * aspectRatio);
      const scale = Math.min(
        1,
        targetMaxWidth / sourceCropWidth,
        targetMaxHeight / sourceCropHeight,
      );
      const outputWidth = Math.max(1, Math.round(sourceCropWidth * scale));
      const outputHeight = Math.max(1, Math.round(sourceCropHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Unable to process image.");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(sourceImage, sx, sy, sw, sh, 0, 0, outputWidth, outputHeight);

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((result) => resolve(result), "image/webp", 0.94),
      );
      if (!blob) throw new Error("Could not create cropped image.");

      const supabase = createClient();
      const safeName = draftFileName.replace(/\s+/g, "-").replace(/[^\w.-]/g, "");
      const filePath = `${userId}/${Date.now()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, blob, {
        upsert: true,
        contentType: "image/webp",
      });
      if (uploadError) {
        setError(uploadError.message);
        return;
      }
      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      onChange(data.publicUrl);
      closeModal();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleBaseClass =
    "absolute size-2.5 rounded-[1px] border border-white/90 bg-white";

  return (
    <>
      <div className="rounded-xl border border-border bg-foreground/4 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="mt-1 text-xs text-muted">Choose the area to display.</p>
          </div>
          <input
            id={`${bucket}-upload-${userId}`}
            ref={inputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleSelectFile}
          />
          <Button type="button" variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
            <Upload />
            Upload
          </Button>
        </div>

        {value ? (
          <div
            className={`relative mt-4 overflow-hidden rounded-xl border border-border ${
              bucket === "avatars" ? "aspect-square w-full max-w-44" : "aspect-[16/6] w-full"
            }`}
          >
            <Image src={value} alt={label} fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 480px" quality={100} />
          </div>
        ) : null}

        {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
      </div>

      {draftDataUrl ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/80 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-border bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">Crop {label}</h3>
              <button type="button" className="rounded-lg p-1 text-muted hover:bg-foreground/10 hover:text-foreground" onClick={closeModal}>
                <X className="size-4" />
              </button>
            </div>
            <div
              ref={stageRef}
              className="relative mx-auto h-[420px] w-full touch-none overflow-hidden rounded-xl border border-border bg-background select-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <img
                ref={imageRef}
                src={draftDataUrl}
                alt="Crop preview"
                className="pointer-events-none h-full w-full select-none object-contain"
                onLoad={() => {
                  const stage = stageRef.current;
                  const image = imageRef.current;
                  if (!stage || !image) return;
                  const stageW = stage.clientWidth;
                  const stageH = stage.clientHeight;
                  const naturalW = image.naturalWidth;
                  const naturalH = image.naturalHeight;
                  const scale = Math.min(stageW / naturalW, stageH / naturalH);
                  const bounds = {
                    x: (stageW - naturalW * scale) / 2,
                    y: (stageH - naturalH * scale) / 2,
                    width: naturalW * scale,
                    height: naturalH * scale,
                  };
                  setImageBounds(bounds);
                  initializeCropRect(bounds);
                }}
                draggable={false}
              />
              {cropRect ? (
                <>
                  <div className="absolute border border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]" style={selectionStyle}>
                    <div className="pointer-events-none absolute inset-x-0 top-1/3 border-t border-dashed border-white/35" />
                    <div className="pointer-events-none absolute inset-x-0 top-2/3 border-t border-dashed border-white/35" />
                    <div className="pointer-events-none absolute inset-y-0 left-1/3 border-l border-dashed border-white/40" />
                    <div className="pointer-events-none absolute inset-y-0 left-2/3 border-l border-dashed border-white/40" />

                    <span data-handle="nw" className={`${handleBaseClass} -left-1.5 -top-1.5 cursor-nwse-resize`} />
                    <span data-handle="ne" className={`${handleBaseClass} -right-1.5 -top-1.5 cursor-nesw-resize`} />
                    <span data-handle="sw" className={`${handleBaseClass} -bottom-1.5 -left-1.5 cursor-nesw-resize`} />
                    <span data-handle="se" className={`${handleBaseClass} -bottom-1.5 -right-1.5 cursor-nwse-resize`} />
                    <span className={`${handleBaseClass} pointer-events-none left-1/2 -top-1.5 -translate-x-1/2`} />
                    <span className={`${handleBaseClass} pointer-events-none -bottom-1.5 left-1/2 -translate-x-1/2`} />
                  </div>
                </>
              ) : null}
            </div>
            <p className="mt-3 text-xs text-muted">Drag inside the box to move. Drag a corner to resize.</p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="button" size="sm" disabled={isUploading || !cropRect} onClick={handleUploadClick}>
                {isUploading ? <LoaderCircle className="animate-spin" /> : null}
                {isUploading ? "Uploading..." : "Apply crop"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
