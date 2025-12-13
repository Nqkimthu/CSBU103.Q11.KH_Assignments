import { useState, useCallback } from "react";
import { Sidebar, ViewType } from "@/components/layout/Sidebar";
import { PhotoGrid, Photo } from "@/components/photo/PhotoGrid";
import { PhotoModal } from "@/components/photo/PhotoModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, SlidersHorizontal, Grid, List, Moon, Sun, Folder, Plus } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Import downloaded assets
import stock1 from "@assets/stock_images/breathtaking_mountai_bc3da436.jpg";
import stock2 from "@assets/stock_images/breathtaking_mountai_65320bd0.jpg";
import stock3 from "@assets/stock_images/breathtaking_mountai_b7818dba.jpg";
import stock4 from "@assets/stock_images/modern_minimalist_ar_0c63f43f.jpg";
import stock5 from "@assets/stock_images/modern_minimalist_ar_f72622ad.jpg";
import stock6 from "@assets/stock_images/modern_minimalist_ar_4d553990.jpg";
import stock7 from "@assets/stock_images/abstract_colorful_gr_479f39a8.jpg";
import stock8 from "@assets/stock_images/abstract_colorful_gr_dabeaf14.jpg";

const MOCK_PHOTOS: Photo[] = [
  { id: "1", url: stock1, title: "Misty Peaks", date: "Today", isFavorite: true },
  { id: "2", url: stock4, title: "Concrete Dreams", date: "Today", isFavorite: false },
  { id: "3", url: stock7, title: "Neon Flow", date: "Yesterday", isFavorite: true },
  { id: "4", url: stock2, title: "Alpine Lake", date: "Yesterday", isFavorite: false },
  { id: "5", url: stock5, title: "Modern Facade", date: "Oct 24", isFavorite: false },
  { id: "6", url: stock8, title: "Gradient Mesh", date: "Oct 22", isFavorite: true },
  { id: "7", url: stock3, title: "Sunset Ridge", date: "Oct 20", isFavorite: false },
  { id: "8", url: stock6, title: "Interior Lines", date: "Sep 15", isFavorite: false },
];

const MOCK_ALBUMS = [
  { id: "1", title: "Vacation 2024", count: 124, cover: stock1 },
  { id: "2", title: "Design Insp", count: 45, cover: stock4 },
  { id: "3", title: "Family", count: 320, cover: stock2 },
  { id: "4", title: "Wallpapers", count: 12, cover: stock7 },
];

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>(MOCK_PHOTOS);
  const [currentView, setCurrentView] = useState<ViewType>("photos");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ 
    onDrop: useCallback((acceptedFiles: File[]) => {
      const newPhotos = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substring(7),
        url: URL.createObjectURL(file),
        title: file.name.split('.')[0],
        date: "Just now",
        isFavorite: false
      }));

      setPhotos(prev => [...newPhotos, ...prev]);

      toast({
        title: "Upload Complete",
        description: `Added ${acceptedFiles.length} photos to your library.`,
      });
    }, []),
    noClick: true 
  });

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleToggleFavorite = (id: string) => {
    setPhotos(photos.map(p => 
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentList = getFilteredPhotos();
    const currentIndex = currentList.findIndex(p => p.id === selectedPhoto.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % currentList.length;
    setSelectedPhoto(currentList[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const currentList = getFilteredPhotos();
    const currentIndex = currentList.findIndex(p => p.id === selectedPhoto.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    setSelectedPhoto(currentList[prevIndex]);
  };

  const getFilteredPhotos = () => {
    switch (currentView) {
      case "favorites":
        return photos.filter(p => p.isFavorite);
      case "recent":
        return [...photos].sort((a, b) => b.date.localeCompare(a.date)); // Mock sort
      case "trash":
        return []; // Empty for now
      default:
        return photos;
    }
  };

  const renderContent = () => {
    if (currentView === "albums") {
      return (
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <motion.div 
            className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <span className="font-medium text-muted-foreground group-hover:text-primary transition-colors">New Album</span>
          </motion.div>
          
          {MOCK_ALBUMS.map((album) => (
            <motion.div 
              key={album.id}
              className="group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-3 relative shadow-sm group-hover:shadow-md transition-shadow">
                <img src={album.cover} alt={album.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg">
                  <span className="text-white text-xs font-medium">{album.count} items</span>
                </div>
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{album.title}</h3>
            </motion.div>
          ))}
        </div>
      );
    }

    if (currentView === "trash") {
      return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <Folder className="h-10 w-10 opacity-20" />
          </div>
          <h3 className="text-lg font-medium mb-1">Trash is empty</h3>
          <p className="text-sm">Items you delete will show up here</p>
        </div>
      );
    }

    return (
      <PhotoGrid 
        photos={getFilteredPhotos()} 
        onPhotoClick={handlePhotoClick} 
        onToggleFavorite={handleToggleFavorite}
      />
    );
  };

  const getPageTitle = () => {
    switch (currentView) {
      case "photos": return "Photos";
      case "albums": return "Albums";
      case "favorites": return "Favorites";
      case "sharing": return "Shared with me";
      case "recent": return "Recent";
      case "trash": return "Trash";
      default: return "Photos";
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden" {...getRootProps()}>
      <input {...getInputProps()} />
      
      {isDragActive && (
        <div className="absolute inset-0 z-50 bg-primary/20 backdrop-blur-sm border-4 border-dashed border-primary m-4 rounded-3xl flex items-center justify-center">
            <div className="bg-background p-8 rounded-2xl shadow-xl text-center animate-in zoom-in duration-300">
                <h3 className="text-2xl font-bold text-primary mb-2">Drop files to upload</h3>
                <p className="text-muted-foreground">Release your mouse to add photos instantly</p>
            </div>
        </div>
      )}

      <Sidebar 
        className="hidden md:flex" 
        currentView={currentView}
        onViewChange={setCurrentView}
        onUpload={open}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm z-10 sticky top-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search your photos..." 
                className="pl-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:bg-background transition-all rounded-xl" 
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl">
                <Sun className="h-5 w-5" />
            </Button>
            <div className="h-6 w-px bg-border mx-2" />
            <Button variant="ghost" size="icon" className="rounded-xl">
                <Grid className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground rounded-xl">
                <List className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="ml-2 rounded-xl">
                <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="max-w-7xl mx-auto">
             <div className="px-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <h1 className="text-3xl font-heading font-bold mb-1">{getPageTitle()}</h1>
                 <p className="text-muted-foreground">
                   {currentView === 'albums' ? 'Organize your memories' : 'Recent uploads and memories'}
                 </p>
             </div>
             
             <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
               {renderContent()}
             </div>
          </div>
        </ScrollArea>
      </main>

      <PhotoModal 
        photo={selectedPhoto} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
