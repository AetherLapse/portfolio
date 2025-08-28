import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Initial setup
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });
    
    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100,
      scale: 0.8
    });

    // Animate in
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.6")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.5,
      ease: "power3.out"
    }, "-=1");

    // Floating animation for background elements
    gsap.to(".glow-orb", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-default">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      
      {/* Spline 3D Background */}
      <div ref={splineRef} className="absolute inset-0 z-0 cursor-none">
        <iframe 
          src='https://my.spline.design/claritystream-fOo2xlwm6ls1brCuB8GBGbRy/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-none cursor-none"
          loading="lazy"
          style={{ cursor: 'none' }}
        />
      </div>

      {/* Floating Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-orb absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full opacity-60 blur-sm" />
        <div className="glow-orb absolute top-3/4 right-1/4 w-6 h-6 bg-secondary rounded-full opacity-40 blur-sm" />
        <div className="glow-orb absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary-glow rounded-full opacity-80 blur-sm" />
        <div className="glow-orb absolute top-1/2 right-1/3 w-3 h-3 bg-secondary-glow rounded-full opacity-50 blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Hi, I'm{' '}
            <span className="cyber-text">Vinayak</span>
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl font-light text-muted-foreground">
              Web Developer and Designer
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              variant="hero"
              size="lg" 
              className="px-8 py-3 text-lg"
              as="a"
              href="https://wa.me/919876543210"
  target="_blank"
  rel="noopener noreferrer"
            >
              Hire Me
            </Button>
            
            <Button 
              variant="neon" 
              size="lg" 
              className="px-8 py-3 text-lg"
              onClick={() => {
              gsap.to(window, {
              duration: 1,
              scrollTo: "#projects", // 👈 Scrolls to ProjectsSection
              ease: "power2.inOut",
              });
              }}
            >
              View My Work
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="relative hidden left-1/2 transform -translate-x-3/4 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;