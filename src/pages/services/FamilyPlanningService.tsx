
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, HeartPulse, Lightbulb } from 'lucide-react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FamilyPlanningService: React.FC = () => {
  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-2">Family Planning Services</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Comprehensive contraception counseling and reproductive health services
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-clinic-50 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-clinic-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contraception Counseling</h3>
              <p className="text-muted-foreground">
                Expert guidance on contraceptive options to help you choose the best method for your needs.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-clinic-50 flex items-center justify-center mb-4">
                <HeartPulse className="h-6 w-6 text-clinic-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reproductive Health</h3>
              <p className="text-muted-foreground">
                Comprehensive services to maintain and improve your reproductive health and wellbeing.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-clinic-50 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-clinic-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Family Planning</h3>
              <p className="text-muted-foreground">
                Personalized guidance to help you plan your family according to your goals and timeline.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contraceptive Options</h2>
            <p className="mb-4">
              We offer a comprehensive range of contraceptive methods and personalized counseling:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Hormonal contraceptives (pills, patches, rings)</li>
              <li>Long-acting reversible contraceptives (IUDs, implants)</li>
              <li>Barrier methods (condoms, diaphragms)</li>
              <li>Emergency contraception</li>
              <li>Natural family planning methods</li>
              <li>Permanent contraception options and counseling</li>
              <li>Follow-up care and method adjustments as needed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Family Planning Counseling</h2>
            <p className="mb-4">
              Our family planning services include comprehensive counseling to help you:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Understand your reproductive health options</li>
              <li>Plan pregnancy timing based on your goals</li>
              <li>Address fertility concerns</li>
              <li>Navigate preconception health</li>
              <li>Discuss the physical, emotional, and financial aspects of family planning</li>
              <li>Access resources and support for your family planning journey</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Reproductive Health Education</h2>
            <p className="mb-4">
              We provide education and resources on a variety of reproductive health topics:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Sexual health and STI prevention</li>
              <li>Menstrual health management</li>
              <li>Preconception care and preparation</li>
              <li>Nutrition and lifestyle for optimal reproductive health</li>
              <li>Relationship and communication skills</li>
              <li>Community resources and support groups</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild className="bg-clinic-600 hover:bg-clinic-700 text-white">
            <Link to="/contact">Book a Consultation</Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default FamilyPlanningService;
