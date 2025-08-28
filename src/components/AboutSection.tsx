import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '@/assets/profile.jpg';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'HTML5', icon: '🔥' },
    { name: 'CSS3', icon: '🎨' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'Python', icon: '🐍' },
    { name: 'Express.JS', icon: '🌐' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const skillElements = skillsRef.current?.children;

    if (!section || !image || !content || !skillElements) return;

    // Initial setup
    gsap.set([image, content], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });
    
    gsap.set(skillElements, {
      opacity: 0,
      y: 30,
      scale: 0.8
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

    tl.to(image, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power3.out"
    })
    .to(content, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power3.out"
    }, "-=0.7")
    .to(skillElements, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.5");

    // Hover animation for image
    const handleImageHover = () => {
      gsap.to(image, {
        rotateY: 10,
        rotateX: 5,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleImageLeave = () => {
      gsap.to(image, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    image.addEventListener('mouseenter', handleImageHover);
    image.addEventListener('mouseleave', handleImageLeave);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      image.removeEventListener('mouseenter', handleImageHover);
      image.removeEventListener('mouseleave', handleImageLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Glowing frame */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary p-1 animate-pulse-glow">
                <div className="w-full h-full rounded-full bg-background p-2">
                  <img 
                    src={profileImage}
                    alt="Vinayak - Web Developer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full float-animation opacity-60" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full float-animation opacity-80" style={{ animationDelay: '-2s' }} />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                About <span className="cyber-text">Me</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm a passionate web developer with a keen eye for detail and a love for creating 
                immersive digital experiences. I specialize in modern web technologies and have a 
                particular interest in 3D web development and interactive animations.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring the latest in web animation, 
                experimenting with new frameworks, or working on creative side projects that 
                push the boundaries of what's possible on the web.
              </p>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="glass-card p-4 text-center hover:scale-105 transition-transform duration-300 cursor-pointer group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;