import { useEffect, useState, type ReactNode } from "react";
import { X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

export function LightboxOverlay({
  image,
  onClose,
}: {
  image: LightboxImage;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.title ?? image.alt}
    >
      <button
        type="button"
        className="absolute top-6 right-6 w-14 h-14 border border-white/40 text-white flex items-center justify-center hover:bg-white/10 transition"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
      >
        <X size={28} />
      </button>
      <div
        className="max-w-[92vw] max-h-[92vh] flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[82vh] object-contain border border-white/20 shadow-2xl"
        />
        {(image.caption || image.title) && (
          <div className="text-center max-w-3xl">
            {image.caption && (
              <p className="text-white/60 text-sm md:text-base tracking-[0.2em] uppercase mb-1">
                {image.caption}
              </p>
            )}
            {image.title && <p className="text-white text-xl md:text-3xl font-light">{image.title}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export function ExpandableImage({
  src,
  alt,
  title,
  caption,
  className,
  imgClassName,
  showHint = true,
  children,
}: LightboxImage & {
  className?: string;
  imgClassName?: string;
  showHint?: boolean;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "relative block w-full h-full min-h-[inherit] text-left cursor-zoom-in group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className
        )}
        aria-label={`Expand image: ${alt}`}
      >
        {children ?? (
          <img src={src} alt={alt} className={cn("w-full h-full object-cover", imgClassName)} />
        )}
        {showHint && (
          <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-[11px] md:text-xs text-white opacity-80 transition-opacity group-hover:opacity-100">
            <ZoomIn size={14} />
            Click to expand
          </span>
        )}
      </button>
      {open && (
        <LightboxOverlay
          image={{ src, alt, title: title ?? alt, caption }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
