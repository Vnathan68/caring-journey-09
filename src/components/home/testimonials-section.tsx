
import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ui-custom/glass-card';

const TestimonialsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    {
      quote: "The care I received during my pregnancy was exceptional. The doctors were attentive, knowledgeable, and made me feel comfortable throughout my journey.",
      author: "Maria Santos",
      role: "Mother of two"
    },
    {
      quote: "Santa Matilda Clinic provided personalized care that made all the difference. Their family planning services helped us prepare for our growing family.",
      author: "Juan and Ana Reyes",
      role: "First-time parents"
    },
    {
      quote: "As someone with complicated gynecological issues, I've never felt more understood and well-cared for than at Santa Matilda. Their expertise is unmatched.",
      author: "Elena Gonzales",
      role: "Patient"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-6">What Our Patients Say</h2>
          <p className="text-muted-foreground text-lg">
            Hear from the women and families who have experienced our care
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <GlassCard 
              key={index} 
              className={`p-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms`, transition: 'all 0.5s ease-out' }}
            >
              <div className="mb-8">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-foreground mb-8 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
