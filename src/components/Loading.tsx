import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingProps {
  onComplete: () => void;
}

const Loading = ({ onComplete }: LoadingProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([logoRef.current, progressBarRef.current], { opacity: 0, y: 50 });

    // Animate in
    tl.to([logoRef.current, progressBarRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    })
    .to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
    })
    .to(logoRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.7)"
    })
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="flex flex-col items-center space-y-8">
        <div ref={logoRef} className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold cyber-text mb-4">
            Vinayak
          </h1>
          <p className="text-xl text-muted-foreground">Loading Experience...</p>
        </div>
        
        <div className="w-80 max-w-md">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              ref={progressBarRef}
              className="progress-bar h-full w-0"
            />
          </div>
        </div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full float-animation opacity-60" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-secondary rounded-full float-animation opacity-40" style={{ animationDelay: '-2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary-glow rounded-full float-animation opacity-80" style={{ animationDelay: '-4s' }} />
      </div>
    </div>
  );
};

export default Loading;