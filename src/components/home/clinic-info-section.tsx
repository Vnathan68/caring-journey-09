
import React from 'react';
import { Phone, Calendar as CalendarIcon, Clock } from 'lucide-react';

const ClinicInfoSection: React.FC = () => {
  return (
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
  );
};

export default ClinicInfoSection;
