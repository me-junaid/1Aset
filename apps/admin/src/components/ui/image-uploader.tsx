"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { UploadCloud, X, Link2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

interface ImageUploaderProps {
  /** Current image URL value */
  value: string;
  /** Called with the new URL whenever it changes (upload or manual paste) */
  onChange: (url: string) => void;
  /** Label shown above the uploader */
  label?: string;
  /** Placeholder for the URL text input */
  placeholder?: string;
  /** Whether this field is required */
  required?: boolean;
  /** Small hint shown below the drop zone */
  hint?: string;
}

type UploadState = "idle" | "uploading" | "success" | "error";

export function ImageUploader({
  value,
  onChange,
  label,
  placeholder = "Paste image URL or upload a file…",
  required = false,
  hint,
}: ImageUploaderProps) {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadError, setUploadError] = useState("");
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    // Validate file type
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
    if (!allowed.includes(file.type)) {
      setUploadError("Only JPG, PNG, WebP, AVIF, or GIF files are allowed.");
      setUploadState("error");
      return;
    }

    // Validate file size (max 10 MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File must be smaller than 10 MB.");
      setUploadState("error");
      return;
    }

    setUploadState("uploading");
    setUploadError("");
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "1aset");

    try {
      // Use XHR to track upload progress
      const url = await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", UPLOAD_URL, true);

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            // Apply f_auto,q_auto for automatic format & quality optimization
            const transformedUrl = data.secure_url.replace(
              "/upload/",
              "/upload/f_auto,q_auto/"
            );
            resolve(transformedUrl);
          } else {
            const errData = JSON.parse(xhr.responseText);
            reject(new Error(errData?.error?.message || "Upload failed."));
          }
        });

        xhr.addEventListener("error", () => reject(new Error("Network error during upload.")));
        xhr.addEventListener("abort", () => reject(new Error("Upload was cancelled.")));

        xhr.send(formData);
      });

      onChange(url);
      setUploadState("success");
      setProgress(100);

      // Reset success state after 3s
      setTimeout(() => setUploadState("idle"), 3000);
    } catch (err: any) {
      setUploadError(err.message || "Upload failed. Please try again.");
      setUploadState("error");
    }
  }, [onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    // Reset so the same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleClear = () => {
    onChange("");
    setUploadState("idle");
    setUploadError("");
    setProgress(0);
  };

  const isUploading = uploadState === "uploading";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold text-slate-400">
          {label}
          {required && <span className="text-rose-400 ml-0.5">*</span>}
        </label>
      )}

      {/* Drop Zone */}
      <div
        onClick={() => !isUploading && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={[
          "relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-all cursor-pointer select-none",
          "min-h-[120px] p-4",
          isUploading
            ? "border-emerald-500/50 bg-emerald-500/5 cursor-not-allowed"
            : isDragOver
            ? "border-emerald-400 bg-emerald-500/10 scale-[1.01]"
            : uploadState === "success"
            ? "border-emerald-500/40 bg-emerald-500/5"
            : uploadState === "error"
            ? "border-rose-500/40 bg-rose-500/5"
            : "border-slate-700 bg-slate-950/40 hover:border-slate-500 hover:bg-slate-950/60",
        ].join(" ")}
      >
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        {/* Preview thumbnail if image is set */}
        {value && !isUploading ? (
          <div className="relative w-full h-36 rounded-lg overflow-hidden">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized={value.startsWith("http")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-rose-600 text-white transition"
              title="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            {uploadState === "success" && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                <CheckCircle2 className="h-3 w-3" />
                Uploaded to Cloudinary
              </div>
            )}
            <div className="absolute bottom-2 right-2 text-[10px] text-white/70 bg-black/50 px-1.5 py-0.5 rounded">
              Click to replace
            </div>
          </div>
        ) : isUploading ? (
          /* Upload Progress */
          <div className="flex flex-col items-center gap-3 w-full px-4">
            <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
            <div className="w-full">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>Uploading to Cloudinary…</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Idle / Empty state */
          <>
            <div
              className={[
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                isDragOver ? "bg-emerald-500/20" : "bg-slate-800",
              ].join(" ")}
            >
              <UploadCloud
                className={[
                  "h-6 w-6 transition-colors",
                  isDragOver ? "text-emerald-400" : "text-slate-400",
                ].join(" ")}
              />
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-slate-300">
                {isDragOver ? "Drop it here!" : "Drag & drop or click to upload"}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                JPG, PNG, WebP, AVIF · Max 10 MB
              </p>
            </div>
          </>
        )}
      </div>

      {/* Error message */}
      {uploadState === "error" && uploadError && (
        <div className="flex items-center gap-1.5 text-rose-400 text-[11px]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Manual URL input */}
      <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 focus-within:border-slate-600 transition">
        <Link2 className="h-3.5 w-3.5 text-slate-500 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (!e.target.value) {
              setUploadState("idle");
              setUploadError("");
            }
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none min-w-0"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-slate-500 hover:text-rose-400 transition shrink-0"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {hint && <p className="text-[10px] text-slate-500">{hint}</p>}
    </div>
  );
}
