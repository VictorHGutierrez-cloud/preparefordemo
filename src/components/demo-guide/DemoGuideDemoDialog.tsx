import { Play, Video } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DemoVideo } from "@/data/demoGuideSteps";

interface DemoGuideDemoDialogProps {
  title: string;
  description?: string;
  videos: DemoVideo[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DemoGuideDemoDialog({
  title,
  description,
  videos,
  open,
  onOpenChange,
}: DemoGuideDemoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {videos.length > 0 ? (
          <div className="flex max-h-[70vh] flex-col gap-5 overflow-y-auto">
            {videos.map((video) => (
              <div key={video.url} className="flex flex-col gap-2">
                {videos.length > 1 && (
                  <p className="text-sm font-semibold text-foreground">{video.label}</p>
                )}
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-border">
                  <iframe
                    src={video.url}
                    title={video.label}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/40 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Video className="h-7 w-7" />
            </div>
            <p className="text-base font-semibold text-foreground">Demo in live product</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Show this module in the Factorial demo environment during the call.
            </p>
            <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground/80">
              <Play className="h-3.5 w-3.5" /> Live demo
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
