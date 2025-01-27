"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { ImageIcon, X } from "lucide-react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { cn } from "@/lib/utils";
import { useEdgeStore } from "@/lib/edgestore";
import { useCoverImage } from "@/hooks/use-cover-image";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type CoverImageProps = {
  url?: string;
  preview?: boolean;
};

export function Cover({ url, preview }: CoverImageProps) {
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const params = useParams();

  async function onRemove() {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }

    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  }
  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            variant="outline"
            size="sm"
            className="text-muted-foreground text-xs"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            variant="outline"
            size="sm"
            className="text-muted-foreground text-xs"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
