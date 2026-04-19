"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef, useState, type ChangeEvent } from "react";
import { LoaderCircle, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface MediaUploaderProps {
  bucket: "avatars" | "covers";
  label: string;
  userId: string;
  value?: string | null;
  onChange: (url: string) => void;
}

export function MediaUploader({
  bucket,
  label,
  userId,
  value,
  onChange,
}: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const supabase = createClient();
      const filePath = `${userId}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) {
        setError(uploadError.message);
        return;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      onChange(data.publicUrl);
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="mt-1 text-xs text-muted">
            Upload directly to Supabase Storage.
          </p>
        </div>
        <label htmlFor={`${bucket}-upload-${userId}`} className="sr-only">
          Upload {label}
        </label>
        <input
          id={`${bucket}-upload-${userId}`}
          ref={inputRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />
        <Button
          type="button"
          variant="secondary"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
        >
          {isUploading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Upload className="size-4" />
          )}
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </div>

      {value ? (
        <div className="mt-4 overflow-hidden rounded-3xl border border-white/8">
          <img
            alt={label}
            className="h-36 w-full object-cover"
            src={value}
          />
        </div>
      ) : null}

      {error ? <p className="mt-3 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
