import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  Image as ImageIcon, 
  HardDrive, 
  Clock, 
  Star, 
  Trash2, 
  Cloud, 
  Plus,
  Settings,
  FolderHeart,
  Heart
} from "lucide-react";

export type ViewType = "photos" | "albums" | "favorites" | "sharing" | "recent" | "trash";

interface SidebarProps {
  className?: string;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onUpload?: () => void;
}

export function Sidebar({ className, currentView, onViewChange, onUpload }: SidebarProps) {
  return (
    <div className={cn("pb-12 min-h-screen w-64 border-r bg-sidebar flex flex-col transition-colors duration-300", className)}>
      <div className="space-y-4 py-4 flex-1">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-4 mb-8">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/20">
              <Heart className="h-4 w-4 text-primary fill-primary" />
            </div>
            <h2 className="text-xl font-heading font-bold tracking-tight text-sidebar-foreground">
              Annie's Moments
            </h2>
          </div>
          
          <div className="px-3 mb-6">
             <Button 
               className="w-full justify-start gap-2 shadow-sm hover:shadow-md transition-all rounded-xl" 
               size="lg"
               onClick={onUpload}
             >
               <Plus className="h-4 w-4" />
               Upload Photos
             </Button>
          </div>

          <div className="space-y-1">
            <Button 
              variant={currentView === "photos" ? "secondary" : "ghost"} 
              className={cn("w-full justify-start gap-3 font-medium rounded-xl", currentView === "photos" && "text-primary")}
              onClick={() => onViewChange("photos")}
            >
              <ImageIcon className="h-4 w-4" />
              Photos
            </Button>
            <Button 
              variant={currentView === "albums" ? "secondary" : "ghost"} 
              className={cn("w-full justify-start gap-3 font-medium rounded-xl", currentView === "albums" && "text-primary")}
              onClick={() => onViewChange("albums")}
            >
              <HardDrive className="h-4 w-4" />
              Albums
            </Button>
            <Button 
              variant={currentView === "favorites" ? "secondary" : "ghost"} 
              className={cn("w-full justify-start gap-3 font-medium rounded-xl", currentView === "favorites" && "text-primary")}
              onClick={() => onViewChange("favorites")}
            >
              <Star className="h-4 w-4" />
              Favorites
            </Button>
            <Button 
              variant={currentView === "sharing" ? "secondary" : "ghost"} 
              className={cn("w-full justify-start gap-3 font-medium rounded-xl", currentView === "sharing" && "text-primary")}
              onClick={() => onViewChange("sharing")}
            >
              <FolderHeart className="h-4 w-4" />
              Sharing
            </Button>
            <Button 
              variant={currentView === "recent" ? "secondary" : "ghost"} 
              className={cn("w-full justify-start gap-3 font-medium rounded-xl", currentView === "recent" && "text-primary")}
              onClick={() => onViewChange("recent")}
            >
              <Clock className="h-4 w-4" />
              Recent
            </Button>
            <Button 
              variant={currentView === "trash" ? "secondary" : "ghost"} 
              className={cn("w-full justify-start gap-3 font-medium rounded-xl", currentView === "trash" && "text-primary")}
              onClick={() => onViewChange("trash")}
            >
              <Trash2 className="h-4 w-4" />
              Trash
            </Button>
          </div>
        </div>
        
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
            Storage
          </h2>
          <div className="px-4 py-2">
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[45%] rounded-full" />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>6.8 GB used</span>
              <span>15 GB total</span>
            </div>
            <Button variant="link" className="h-auto p-0 text-xs mt-2 text-primary">
              Buy Storage
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-primary rounded-xl">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}
