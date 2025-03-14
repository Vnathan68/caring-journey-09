
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { Calendar, Phone, Clock, MapPin } from 'lucide-react';

const CTASection: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="py-24 bg-gradient-to-r from-clinic-600 to-clinic-500 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Appointment?</h2>
            <p className="text-white/90 max-w-xl text-lg leading-relaxed mb-8">
              Our team of expert doctors is ready to provide you with personalized care tailored to your unique needs. Schedule a consultation today and take the first step towards better health.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <Button 
                size="lg" 
                className="bg-white text-clinic-600 hover:bg-white/90 shadow-md hover:shadow-lg transition-all"
                asChild
              >
                <Link to={isAuthenticated ? "/dashboard/appointments" : "/signup"}>
                  <Calendar className="mr-2 h-5 w-5" />
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
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Clock className="h-6 w-6 text-white/80 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">Clinic Hours</h3>
                  <p className="text-white/80">Mon-Fri: 8am - 7pm</p>
                  <p className="text-white/80">Sat: 9am - 5pm</p>
                  <p className="text-white/80">Sun: Closed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-white/80 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">Location</h3>
                  <p className="text-white/80">123 Healthcare Ave.</p>
                  <p className="text-white/80">Manila, Philippines</p>
                  <Link to="/contact" className="text-white underline hover:text-white/90">
                    View on map
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Specialized Care</h4>
                  <p className="text-white/80">Our doctors specialize in women's health across all life stages</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Modern Facilities</h4>
                  <p className="text-white/80">State-of-the-art equipment and comfortable environment</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Comprehensive Services</h4>
                  <p className="text-white/80">From routine check-ups to specialized treatments</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-medium">Patient-Centered Approach</h4>
                  <p className="text-white/80">We listen to your concerns and involve you in decisions</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
