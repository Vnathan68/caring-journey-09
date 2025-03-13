
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, Users, ArrowRight, Phone, Calendar as CalendarIcon, Clock } from 'lucide-react';
import GlassCard from '@/components/ui-custom/glass-card';
import PageTransition from '@/components/ui-custom/page-transition';
import AnimatedCounter from '@/components/ui-custom/animated-counter';
import { useAuth } from '@/contexts/auth-context';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
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

  const stats = [
    { label: "Years of Experience", value: 15 },
    { label: "Satisfied Patients", value: 5000 },
    { label: "Expert Doctors", value: 8 },
    { label: "Successful Births", value: 2500 }
  ];

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
    <PageTransition>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-clinic-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 bg-[url('/pattern-dots.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 py-24 md:py-32 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-lg animate-slide-up">
              Expert Women's Healthcare for Every Stage of Life
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg animate-slide-up" style={{animationDelay: '0.1s'}}>
              Santa Matilda Birthing and Family Planning Clinic provides comprehensive care with compassion, expertise, and a patient-first approach.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <Button 
                size="lg" 
                className="bg-clinic-600 hover:bg-clinic-700 text-white"
                asChild
              >
                <Link to={isAuthenticated ? "/dashboard/appointments" : "/signup"}>
                  Book an Appointment
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-clinic-200 hover:bg-clinic-50 dark:hover:bg-slate-800"
                asChild
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 animate-blur-in" style={{animationDelay: '0.3s'}}>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-clinic-500 to-clinic-400 rounded-3xl blur-lg opacity-75"></div>
              <img 
                src="https://images.unsplash.com/photo-1559656384-c0d885465526?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Doctor with patient" 
                className="rounded-3xl w-full h-auto relative z-10 shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
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
      
      {/* Stats Section */}
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
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Patients Say</h2>
            <p className="text-muted-foreground">
              Hear from the women and families who have experienced our care
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <GlassCard 
                key={index} 
                className={`p-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms`, transition: 'all 0.5s ease-out' }}
              >
                <div className="mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-clinic-600 to-clinic-500 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Book Your Appointment?</h2>
              <p className="text-white/80 max-w-lg">
                Schedule a consultation with our expert doctors today. We're committed to providing you with personalized care.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-clinic-600 hover:bg-white/90"
                asChild
              >
                <Link to={isAuthenticated ? "/dashboard/appointments" : "/signup"}>
                  Book Appointment
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Info */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Phone className="h-6 w-6 text-clinic-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                <p className="text-muted-foreground">+63 (123) 456-7890</p>
                <p className="text-muted-foreground">contact@santamatilda.ph</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CalendarIcon className="h-6 w-6 text-clinic-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Appointment Hours</h3>
                <p className="text-muted-foreground">Mon-Fri: 8:00 AM - 7:00 PM</p>
                <p className="text-muted-foreground">Saturday: 8:00 AM - 5:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Clock className="h-6 w-6 text-clinic-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Emergency Hours</h3>
                <p className="text-muted-foreground">24/7 For Existing Patients</p>
                <p className="text-muted-foreground">Call our emergency line</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
