import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const particles = particlesRef.current?.children;

    if (!footer || !particles) return;

    // Initial setup
    gsap.set(footer, {
      opacity: 0,
      y: 60,
      filter: 'blur(10px)'
    });

    // Create ScrollTrigger animation
    gsap.to(footer, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate floating particles
    gsap.to(particles, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.3
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/AetherLapse",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/vinayak-raj-seo",
      label: "LinkedIn"
    }
  ];

  return (
    <footer ref={footerRef} className="relative py-12 border-t border-border">
      {/* Floating Particles Background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-30" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-secondary rounded-full opacity-50" />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary-glow rounded-full opacity-20" />
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-secondary-glow rounded-full opacity-40" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold cyber-text mb-2">
              Vinayak Code
            </div>
            <p className="text-sm text-muted-foreground">
              Crafting digital experiences with passion and precision.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center space-x-1">
            <span>© {currentYear} Vinayak Raj. Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>and lots of coffee.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;