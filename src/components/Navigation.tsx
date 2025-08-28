import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-card backdrop-blur-md' : ''
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold cyber-text">
              Vinayak's Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              
              <div className="flex items-center space-x-4 ml-6">
                <a href="https://github.com/AetherLapse" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
                <a href="https://linkedin.com/in/vinayak-raj-seo" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-secondary transition-colors" />
                </a>

                <a
  href="https://wa.me/917983796831?text=Hello,%20I’m%20interested%20in%20your%20resume%20and%20would%20like%20to%20know%20more%20about%20your%20skills%20and%20experience."
  target="_blank"
  rel="noopener noreferrer"
>
                
                <Button 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Hire Me
                </Button>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-30 md:hidden transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />
        <div className="relative h-full flex flex-col justify-center items-center space-y-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.label}
            </a>
          ))}
          
          <div className="flex items-center space-x-6 pt-8">
            <a href="https://github.com/AetherLapse" target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="https://linkedin.com/in/vinayak-raj-seo" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 text-muted-foreground hover:text-secondary transition-colors" />
            </a>
          </div>
          <a
  href="https://wa.me/917983796831?text=Hello,%20I’m%20interested%20in%20your%20resume%20and%20would%20like%20to%20know%20more%20about%20your%20skills%20and%20experience."
  target="_blank"
  rel="noopener noreferrer"
>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-8">
              Hire Me
            </Button>
            </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;