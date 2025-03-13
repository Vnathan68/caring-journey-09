
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Clinic Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-7 w-7 text-clinic-600" />
              <span className="font-poppins font-semibold text-xl">Santa Matilda</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Dedicated to providing comprehensive birthing and family planning services to women and families in Bulacan, Philippines.
            </p>
            <div className="flex space-x-4 items-center">
              <a href="#" className="text-muted-foreground hover:text-clinic-600 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-clinic-600 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-clinic-600 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-clinic-600 transition-colors inline-flex items-center">
                  <ArrowRight className="mr-2 h-3.5 w-3.5" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-clinic-600 transition-colors inline-flex items-center">
                  <ArrowRight className="mr-2 h-3.5 w-3.5" />
                  <span>Our Services</span>
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-muted-foreground hover:text-clinic-600 transition-colors inline-flex items-center">
                  <ArrowRight className="mr-2 h-3.5 w-3.5" />
                  <span>Our Doctors</span>
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-muted-foreground hover:text-clinic-600 transition-colors inline-flex items-center">
                  <ArrowRight className="mr-2 h-3.5 w-3.5" />
                  <span>Book Appointment</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-clinic-600 transition-colors inline-flex items-center">
                  <ArrowRight className="mr-2 h-3.5 w-3.5" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-clinic-600 mr-2.5 mt-0.5" />
                <span className="text-muted-foreground">123 Main Street, San Jose City, Bulacan, Philippines</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-clinic-600 mr-2.5 mt-0.5" />
                <span className="text-muted-foreground">+63 (123) 456-7890</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-clinic-600 mr-2.5 mt-0.5" />
                <span className="text-muted-foreground">contact@santamatilda.ph</span>
              </li>
              <li className="flex">
                <Clock className="h-5 w-5 text-clinic-600 mr-2.5 mt-0.5" />
                <div className="text-muted-foreground">
                  <p>Mon-Fri: 8:00 AM - 7:00 PM</p>
                  <p>Saturday: 8:00 AM - 5:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter to receive updates on our services and health tips.
            </p>
            <form className="space-y-3">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="rounded-r-none focus-visible:ring-1 focus-visible:ring-clinic-500" 
                />
                <Button type="submit" className="rounded-l-none bg-clinic-600 hover:bg-clinic-700">
                  Send
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
            <p>© {new Date().getFullYear()} Santa Matilda Birthing & Family Planning Clinic. All rights reserved.</p>
            <div className="space-x-6">
              <Link to="/privacy" className="hover:text-clinic-600 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-clinic-600 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
