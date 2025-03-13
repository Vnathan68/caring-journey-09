
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';

const CTASection: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
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
  );
};

export default CTASection;
