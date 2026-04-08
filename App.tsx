import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Heart, Star, Sparkles } from 'lucide-react';

const EXHIBITION_INFO = {
  title: "Aerin Pandemic",
};

const PHOTOS = [
  { id: 1, url: "/IMG_20260404_015010_744.jpg", aspect: "portrait" },
  { id: 2, url: "/IMG_20260404_000650_940.jpg", aspect: "landscape" },
  { id: 3, url: "/IMG_20251228_002420_678.jpg", aspect: "square" },
  { id: 4, url: "/IMG_20251228_002420_678.jpg", aspect: "portrait" },
  { id: 5, url: "/Screenshot_2025-10-29-00-36-22-922_com.instagram.android-edit.jpg", aspect: "landscape" },
  { id: 6, url: "/Screenshot_2025-11-07-23-19-12-942_com.instagram.android.jpg", aspect: "portrait" },
];

export default function App() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') setSelectedPhotoIndex((prev) => (prev! + 1) % PHOTOS.length);
      if (e.key === 'ArrowLeft') setSelectedPhotoIndex((prev) => (prev! - 1 + PHOTOS.length) % PHOTOS.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  const openLightbox = (index: number) => setSelectedPhotoIndex(index);
  const closeLightbox = () => setSelectedPhotoIndex(null);
  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev! + 1) % PHOTOS.length);
  };
  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev! - 1 + PHOTOS.length) % PHOTOS.length);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-fuchsia-500/50">
      {/* Header / Hero Section */}
      <header className="px-6 py-24 md:py-32 max-w-5xl mx-auto text-center flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative inline-block"
        >
          {/* Decorative Elements */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-12 -left-12 md:-top-16 md:-left-16 text-fuchsia-400/50"
          >
            <Sparkles className="w-12 h-12 md:w-16 md:h-16" />
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 z-30"
          >
            <Star className="w-8 h-8 md:w-12 md:h-12 text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]" fill="currentColor" />
          </motion.div>

          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -right-16 md:-right-24 -translate-y-1/2 z-30"
          >
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]" fill="currentColor" />
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 -right-8 md:-right-12 z-30"
          >
            <Star className="w-5 h-5 text-violet-300/80 drop-shadow-[0_0_10px_rgba(196,181,253,0.6)]" fill="currentColor" />
          </motion.div>

          <h1 className="font-serif text-6xl md:text-8xl font-bold italic tracking-tight text-3d-neon relative z-20">
            {EXHIBITION_INFO.title}
          </h1>
        </motion.div>
      </header>

      {/* Gallery Section */}
      <main className="px-6 pb-24 max-w-7xl mx-auto relative">
        {/* Transparent Star Stickers between photos */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="absolute top-[15%] left-[5%] md:left-[50%] lg:left-[33%] -translate-x-1/2 z-10 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [15, 25, 15] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
          >
            <Star className="w-6 h-6 text-yellow-300/90 drop-shadow-[0_0_10px_rgba(253,224,71,0.6)]" fill="currentColor" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="absolute top-[35%] right-[5%] md:right-[10%] lg:right-[33%] translate-x-1/2 z-10 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [-15, -5, -15] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
          >
            <Star className="w-8 h-8 text-fuchsia-300/90 drop-shadow-[0_0_12px_rgba(240,171,252,0.6)]" fill="currentColor" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="absolute top-[65%] left-[5%] md:left-[10%] lg:left-[33%] -translate-x-1/2 z-10 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [30, 40, 30] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
          >
            <Star className="w-5 h-5 text-purple-300/90 drop-shadow-[0_0_10px_rgba(216,180,254,0.6)]" fill="currentColor" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="absolute top-[85%] right-[5%] md:right-[50%] lg:right-[33%] translate-x-1/2 z-10 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 12, 0], rotate: [-25, -15, -25] }}
            transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
          >
            <Star className="w-7 h-7 text-pink-300/90 drop-shadow-[0_0_12px_rgba(249,168,212,0.6)]" fill="currentColor" />
          </motion.div>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="break-inside-avoid relative group cursor-pointer p-2 md:p-3 rounded-[2rem] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border border-white/30 shadow-[0_16px_40px_0_rgba(142,45,226,0.4)] hover:from-white/30 hover:to-white/10 hover:border-white/50 hover:shadow-[0_24px_64px_0_rgba(213,0,249,0.6)] transition-all duration-500"
              onClick={() => openLightbox(index)}
            >
              <div className="overflow-hidden rounded-[1.5rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                <img
                  src={photo.url}
                  alt={`Photo ${index + 1}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer Signature */}
      <footer className="py-16 text-center flex justify-center items-center overflow-hidden">
        <div className="relative inline-flex flex-col items-center justify-center px-8 py-4">
          {/* Stars */}
          <motion.div 
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 10, y: [0, -4, 0] }}
            transition={{ delay: 0.2, type: "spring", y: { repeat: Infinity, duration: 3, ease: "easeInOut" } }}
            className="absolute -top-2 -left-4 z-10"
          >
            <Star className="w-5 h-5 text-yellow-400/80 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" fill="currentColor" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: -15, y: [0, 4, 0] }}
            transition={{ delay: 0.4, type: "spring", y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } }}
            className="absolute -bottom-2 -right-4 z-10"
          >
            <Star className="w-6 h-6 text-fuchsia-400/80 drop-shadow-[0_0_12px_rgba(232,121,249,0.6)]" fill="currentColor" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0, rotate: 15 }}
            animate={{ opacity: 1, scale: 1, rotate: 30, y: [0, -3, 0] }}
            transition={{ delay: 0.6, type: "spring", y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } }}
            className="absolute top-0 -right-6 z-10"
          >
            <Star className="w-4 h-4 text-purple-400/80 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]" fill="currentColor" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0, rotate: -35 }}
            animate={{ opacity: 1, scale: 1, rotate: -10, y: [0, 5, 0] }}
            transition={{ delay: 0.8, type: "spring", y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
            className="absolute bottom-0 -left-6 z-10"
          >
            <Star className="w-4 h-4 text-pink-400/80 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]" fill="currentColor" />
          </motion.div>

          <div className="relative z-20 flex flex-col items-center gap-1">
            <p className="font-sans text-sm md:text-base font-medium tracking-widest text-white/80 uppercase">
              Rockeira Autista
            </p>
            <p className="font-sans text-xs md:text-sm text-white/50 tracking-widest">
              08/02
            </p>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-purple-950/40 backdrop-blur-2xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full p-3 transition-all duration-300"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            <button
              className="absolute left-2 md:left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full p-3 md:p-4 transition-all duration-300 z-50"
              onClick={prevPhoto}
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <motion.div
              key={selectedPhotoIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[85vh] mx-12 md:mx-24 p-2 md:p-4 rounded-[2rem] md:rounded-[3rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_32px_64px_0_rgba(0,0,0,0.5)] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={PHOTOS[selectedPhotoIndex].url}
                alt={`Photo ${selectedPhotoIndex + 1}`}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[75vh] object-contain rounded-[1.5rem] md:rounded-[2rem]"
              />
            </motion.div>

            <button
              className="absolute right-2 md:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full p-3 md:p-4 transition-all duration-300 z-50"
              onClick={nextPhoto}
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
