
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import PageTransition from '@/components/ui-custom/page-transition';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    console.log('Form submitted');
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-lg text-muted-foreground mb-10">
          We're here to help and answer any questions you may have
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-clinic-600 hover:bg-clinic-700 text-white">
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Clinic Information</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 text-clinic-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Our Location</h3>
                      <p className="text-muted-foreground mt-1">
                        123 Healthcare Blvd, San Jose City<br />
                        Bulacan, Philippines
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 text-clinic-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone Numbers</h3>
                      <p className="text-muted-foreground mt-1">
                        Main Line: +63 (44) 123 4567<br />
                        Emergency: +63 (44) 987 6543
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-5 w-5 text-clinic-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email Addresses</h3>
                      <p className="text-muted-foreground mt-1">
                        General Inquiries: info@santamatilda.ph<br />
                        Appointments: appointments@santamatilda.ph
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="h-5 w-5 text-clinic-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Hours of Operation</h3>
                      <p className="text-muted-foreground mt-1">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 8:00 AM - 12:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
