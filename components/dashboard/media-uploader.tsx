"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="mt-1 text-xs text-muted">
            Upload directly to Supabase Storage.
          </p>
        </div>
        <label>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (!file) {
                return;
              }

              setError(null);

              startTransition(async () => {
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
              });
            }}
          />
          <Button type="button" variant="secondary">
            {isPending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}
            Upload
          </Button>
        </label>
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
