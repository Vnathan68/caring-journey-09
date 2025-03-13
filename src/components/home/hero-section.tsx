
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';

const HeroSection: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
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
  );
};

export default HeroSection;
