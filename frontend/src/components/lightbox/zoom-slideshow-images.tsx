import Lightbox from "yet-another-react-lightbox";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import type { SlideshowRef, ZoomRef } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { useEffect, useRef, useState } from "react";
import ProgressLoading from "../loading/progress-loading";
const ZoomSlideshowImages = ({
  open,
  onOpen,
  images,
  currentIndex,
}: {
  open: boolean;
  onOpen: (v: boolean) => void;
  images: string[];
  currentIndex: number;
}) => {
  const lightBoxSlideRef = useRef<SlideshowRef | null>(null);
  const zoomRef = useRef<ZoomRef | null>(null);
  const duration = 3000;
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZoomimg, setIsZooming] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const prevIndexRef = useRef<number>(currentIndex);

  // Update index when first mounted prevent flick index
  useEffect(() => {
    setLightboxIndex(currentIndex);
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Update key for reset animation loading
  useEffect(() => {
    if (isPlaying && lightboxIndex !== prevIndexRef.current) {
      setProgressKey((prev) => prev + 1);
      prevIndexRef.current = lightboxIndex;
    }
  }, [lightboxIndex, isPlaying]);

  return (
    <div>
      {isPlaying && (
        <ProgressLoading duration={duration} resetKey={progressKey} />
      )}
      <Lightbox
        index={lightboxIndex}
        className={`  ${
          isZoomimg ? "hover:cursor-grab" : "hover:cursor-zoom-in"
        }`}
        plugins={[Slideshow, Zoom]}
        zoom={{ ref: zoomRef }}
        slideshow={{
          ref: lightBoxSlideRef,
          autoplay: false,
          delay: duration,
        }}
        on={{
          zoom: ({ zoom }: { zoom: number }) => {
            if (zoom > 1) {
              setIsZooming(true);
            } else {
              setIsZooming(false);
            }
          },
          exited: () => setIsPlaying(false),
          slideshowStart: () => setIsPlaying(true),
          slideshowStop: () => setIsPlaying(false),
          view: ({ index }: { index: number }) => {
            setLightboxIndex(index);
          },
        }}
        carousel={{ finite: true }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, .8)" },
        }}
        render={{
          buttonPrev: images.length <= 1 ? () => null : undefined,
          buttonNext: images.length <= 1 ? () => null : undefined,
        }}
        open={open}
        close={() => onOpen(false)}
        slides={images.map((img) => {
          return { src: img, alt: img };
        })}
      />
    </div>
  );
};

export default ZoomSlideshowImages;
