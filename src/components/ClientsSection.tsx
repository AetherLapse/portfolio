import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import client logos
import webTopLogo from '@/assets/clients/webtop.png';
import promotion4uLogo from '@/assets/clients/promotion4u.png';
import americanEnergyLogo from '@/assets/clients/americanenergy.png';
import betteboboLogo from '@/assets/clients/bettebobo.png';

gsap.registerPlugin(ScrollTrigger);

const ClientsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);

  const clients = [
    {
      id: 1,
      name: "Web Top Solutions",
      description: "Web Development Solutions",
      logo: webTopLogo
    },
    {
      id: 2,
      name: "Promotion4u",
      description: "Marketing and Development Agency",
      logo: promotion4uLogo
    },
    {
      id: 3,
      name: "American Energy",
      description: "Solar Energy Company",
      logo: americanEnergyLogo
    },
    {
      id: 4,
      name: "BetteBobo",
      description: "Beauty Products",
      logo: betteboboLogo
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const clientCards = clientsRef.current?.children;

    if (!section || !clientCards) return;

    gsap.set(clientCards, { opacity: 0, y: 50, scale: 0.9 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to(clientCards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="clients" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Clients <span className="cyber-text">I’ve Worked With</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A selection of amazing companies and brands I’ve collaborated with.
          </p>
        </div>

        <div ref={clientsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {clients.map((client) => (
            <div
              key={client.id}
              className="glass-card p-6 hover:scale-105 transition-transform duration-300 text-center"
            >
              {/* Client Logo */}
              <div className="flex justify-center mb-4">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-20 object-contain"
                />
              </div>

              {/* Client Info */}
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {client.name}
              </h3>
              <p className="text-sm text-muted-foreground">{client.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
