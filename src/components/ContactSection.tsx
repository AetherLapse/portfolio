import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { FaInstagram, FaDiscord } from "react-icons/fa"; 

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const contactInfo = contactInfoRef.current;

    if (!section || !form || !contactInfo) return;

    // Initial setup
    gsap.set([form, contactInfo], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });

    // Create ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to([form, contactInfo], {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      stagger: 0.3,
      ease: "power3.out"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Animate success
    gsap.to(formRef.current, {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "vinayakrajx@gmail.com",
      href: "mailto:vinayakrajx@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9286128202",
      href: "tel:+91 9286128202"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Uttar Pradesh, India",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/AetherLapse"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/vinayak-raj-seo"
    },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://instagram.com/vinayak_rajx", // replace with your profile
  },
  {
    icon: FaDiscord,
    label: "Discord",
    href: "https://discord.com/users/irunyx", // replace with your Discord user link
  },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Get In <span className="cyber-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Send Message</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Your Name
                  </label>
                  <Input 
                    type="text" 
                    placeholder="John Doe"
                    className="glass-card border-glass-border focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Your Email
                  </label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com"
                    className="glass-card border-glass-border focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  Subject
                </label>
                <Input 
                  type="text" 
                  placeholder="Project Discussion"
                  className="glass-card border-glass-border focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  Your Message
                </label>
                <Textarea 
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="glass-card border-glass-border focus:border-primary focus:ring-primary resize-none"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground pulse-glow"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>

          {/* Contact Info */}
          <div ref={contactInfoRef} className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Contact Info</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center space-x-4 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{info.label}</p>
                      <p className="text-sm">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6 text-foreground">Connect with me</h3>
              
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;