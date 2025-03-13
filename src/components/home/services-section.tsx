
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar, ArrowRight } from 'lucide-react';
import GlassCard from '@/components/ui-custom/glass-card';

const ServicesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "Obstetrics Care",
      description: "Comprehensive pregnancy care from prenatal to postnatal, ensuring the health of both mother and baby.",
      icon: Heart,
      href: "/services/obstetrics"
    },
    {
      title: "Gynecology Services",
      description: "Complete healthcare for women of all ages, from adolescence through menopause and beyond.",
      icon: Users,
      href: "/services/gynecology"
    },
    {
      title: "Family Planning",
      description: "Expert guidance on contraception options and reproductive health planning tailored to your needs.",
      icon: Calendar,
      href: "/services/family-planning"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground">
            Comprehensive women's healthcare services delivered with compassion and expertise
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <GlassCard 
              key={index} 
              interactive
              className={`p-8 transform transition-all duration-300 hover:translate-y-[-5px] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-clinic-50 dark:bg-slate-800 text-clinic-600 rounded-xl mb-6">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <Link 
                to={service.href}
                className="inline-flex items-center text-clinic-600 hover:text-clinic-700 font-medium"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
