
import React, { useState, useEffect, useRef } from 'react';
import AnimatedCounter from '@/components/ui-custom/animated-counter';
import { motion } from 'framer-motion';

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const stats = [
    { 
      label: "Years of Experience", 
      value: 15,
      description: "Providing specialized women's healthcare since 2008"
    },
    { 
      label: "Satisfied Patients", 
      value: 5000,
      description: "Trusted by thousands of women across the region" 
    },
    { 
      label: "Expert Doctors", 
      value: 8,
      description: "Board-certified specialists in women's health" 
    },
    { 
      label: "Successful Births", 
      value: 2500,
      description: "Bringing new life into the world with care" 
    }
  ];

  return (
    <section ref={sectionRef} className="py-28 bg-gradient-to-b from-clinic-50 to-white dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-clinic-800 dark:text-white mb-4">Our Impact in Numbers</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            For over a decade, we've been committed to providing exceptional care for women at every stage of life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-all text-center"
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-clinic-100 dark:bg-clinic-900">
                <span className="text-2xl text-clinic-600 dark:text-clinic-300">
                  {index === 0 ? "15+" : index === 1 ? "5K+" : index === 2 ? "8+" : "2.5K+"}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-clinic-600 dark:text-clinic-300 mb-2">
                <AnimatedCounter value={stat.value} formatter={(val) => val.toLocaleString()} />
                <span className="text-clinic-500 dark:text-clinic-400">+</span>
              </h3>
              <p className="text-lg font-medium mb-2">{stat.label}</p>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
