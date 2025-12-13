import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Photo {
  id: string;
  url: string;
  title: string;
  date: string;
  width?: number;
  height?: number;
  isFavorite?: boolean;
}

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  onToggleFavorite?: (id: string) => void;
}

export function PhotoGrid({ photos, onPhotoClick, onToggleFavorite }: PhotoGridProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(id);
  };

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p className="text-lg font-medium">No photos found</p>
        <p className="text-sm">Try uploading some or checking other folders</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6 pb-20">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={cn(
            "group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-muted",
            "ring-2 ring-transparent transition-all duration-300",
            selectedIds.has(photo.id) ? "ring-primary shadow-lg scale-[0.98]" : "hover:ring-primary/30 hover:shadow-md"
          )}
          onClick={() => onPhotoClick(photo)}
        >
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div 
            className={cn(
              "absolute top-2 left-2 w-6 h-6 rounded-full border-2 border-white/50 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-white hover:bg-white/20",
              selectedIds.has(photo.id) ? "bg-primary border-primary hover:bg-primary hover:border-primary opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
            onClick={(e) => toggleSelection(photo.id, e)}
          >
            {selectedIds.has(photo.id) && <Check className="w-3.5 h-3.5 text-white" />}
          </div>

          <div 
            className={cn(
                "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/20 backdrop-blur-sm",
                photo.isFavorite ? "opacity-100 text-red-500" : "opacity-0 group-hover:opacity-100 text-white/70 hover:text-white"
            )}
            onClick={(e) => toggleFavorite(photo.id, e)}
          >
            <Heart className={cn("w-5 h-5 transition-transform active:scale-90", photo.isFavorite && "fill-current")} />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <p className="text-white text-sm font-medium truncate">{photo.title}</p>
            <p className="text-white/70 text-xs">{photo.date}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
