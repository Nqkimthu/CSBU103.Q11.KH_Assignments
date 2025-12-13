import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2, Info, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Photo } from "./PhotoGrid";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function PhotoModal({ photo, isOpen, onClose, onNext, onPrev }: PhotoModalProps) {
  if (!photo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] h-[90vh] p-0 bg-black/95 border-none text-white overflow-hidden flex flex-col items-center justify-center">
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex items-center gap-3">
               <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={onClose}>
                   <X className="h-5 w-5" />
               </Button>
               <div>
                   <h3 className="text-sm font-medium">{photo.title}</h3>
                   <p className="text-xs text-white/70">{photo.date}</p>
               </div>
            </div>
            
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
                    <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
                    <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
                    <Info className="h-4 w-4" />
                </Button>
            </div>
        </div>

        {/* Main Image */}
        <div className="relative w-full h-full flex items-center justify-center p-4">
             <AnimatePresence mode="wait">
                <motion.img
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    src={photo.url}
                    alt={photo.title}
                    className="max-h-full max-w-full object-contain shadow-2xl"
                />
             </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-y-0 left-4 flex items-center z-40">
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
                onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
        </div>
        
        <div className="absolute inset-y-0 right-4 flex items-center z-40">
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
                onClick={(e) => { e.stopPropagation(); onNext?.(); }}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
