import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "3D Interactive Web",
      description: "Modern web experience with immersive 3D elements and smooth animations.",
      image: project1,
      tech: ["React", "Three.js", "GSAP", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Gaming Platform",
      description: "Next-level gaming website with neon effects and interactive components.",
      image: project2,
      tech: ["Vue.js", "WebGL", "Node.js", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Animation Portfolio",
      description: "Creative showcase featuring advanced web animations and transitions.",
      image: project3,
      tech: ["React", "GSAP", "Framer Motion", "CSS"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "E-commerce Platform",
      description: "Modern online store with seamless user experience and payment integration.",
      image: project1,
      tech: ["Next.js", "Stripe", "MongoDB", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "AI Dashboard",
      description: "Data visualization dashboard with machine learning insights.",
      image: project2,
      tech: ["React", "D3.js", "Python", "FastAPI"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "Mobile App",
      description: "Cross-platform mobile application with native performance.",
      image: project3,
      tech: ["React Native", "Expo", "Firebase", "Redux"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const projectCards = projectsRef.current?.children;

    if (!section || !projectCards) return;

    // Initial setup
    gsap.set(projectCards, {
      opacity: 0,
      y: 50,
      scale: 0.8
    });

    // Create ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to(projectCards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.7)"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="cyber-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my latest work, featuring cutting-edge technologies and innovative solutions.
          </p>
        </div>

        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="glass-card p-6 group hover:scale-105 transition-transform duration-300"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-xs bg-muted rounded-full text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live
                    </a>
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground flex-1"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;