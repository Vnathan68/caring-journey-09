
import React, { useState, useEffect } from 'react';
import AnimatedCounter from '@/components/ui-custom/animated-counter';

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Years of Experience", value: 15 },
    { label: "Satisfied Patients", value: 5000 },
    { label: "Expert Doctors", value: 8 },
    { label: "Successful Births", value: 2500 }
  ];

  return (
    <section className="py-20 bg-clinic-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms`, transition: 'all 0.5s ease-out' }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-clinic-600 mb-2">
                <AnimatedCounter value={stat.value} formatter={(val) => val.toLocaleString()} />+
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
