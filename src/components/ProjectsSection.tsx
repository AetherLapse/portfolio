import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Text Editor App",
      description: "A modern text editor with real-time collaboration and markdown support.",
      image: project1,
      tech: ["Python", "Tkinter"],
      liveUrl: "#",
      githubUrl: "https://github.com/AetherLapse/Lightweight-Text-Editor"
    },
    {
      id: 2,
      title: "School Lead Management System",
      description: "A comprehensive system to manage and track school leads effectively.",
      image: project2,
      tech: ["AJAX", "PHP", "MySQL", "XAMPP"],
      liveUrl: "#",
      githubUrl: "https://github.com/AetherLapse/School-Lead-Management"
    },
    {
      id: 3,
      title: "HealthBot AI",
      description: "An AI-powered chatbot for health consultations and symptom checking.",
      image: project3,
      tech: ["Python", "Pandas / NumPy", "Scikit-learn", "FastAPI", "Ngrok"],
      liveUrl: "#",
      githubUrl: "https://github.com/AetherLapse/healthbotv1"
    },
    {
      id: 4,
      title: "Resume Analyzer with AI",
      description: "AI-driven resume analysis tool to optimize job applications.",
      image: project4,
      tech: ["Python", "FastAPI", "Ngrok", "React", "spaCy"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Personal Finance Tracker",
      description: "A web app to track expenses, budgets, and financial goals.",
      image: project5,
      tech: ["React", "SQL", "Python", "FastAPI", "Firebase"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "Smart To-Do with AI Suggestions",
      description: "An intelligent to-do app that provides task suggestions based on user habits.",
      image: project6,
      tech: ["React", "ML", "Firebase", "FastAPI", "Ngrok"],
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