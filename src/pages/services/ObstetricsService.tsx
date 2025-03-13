
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Baby, Stethoscope, UserCheck } from 'lucide-react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ObstetricsService: React.FC = () => {
  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-2">Obstetrics Services</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Comprehensive care for women throughout pregnancy, childbirth, and the postpartum period
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-clinic-50 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-clinic-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prenatal Care</h3>
              <p className="text-muted-foreground">
                Regular check-ups to monitor your health and your baby's development throughout pregnancy.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-clinic-50 flex items-center justify-center mb-4">
                <Baby className="h-6 w-6 text-clinic-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Birthing Services</h3>
              <p className="text-muted-foreground">
                Safe and supportive environment for labor and delivery with experienced medical professionals.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-clinic-50 flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6 text-clinic-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Postpartum Care</h3>
              <p className="text-muted-foreground">
                Physical and emotional support for mothers after childbirth to ensure a healthy recovery.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Comprehensive Prenatal Care</h2>
            <p className="mb-4">
              Our obstetrics team provides complete prenatal care to monitor and support you throughout your pregnancy journey. 
              Our services include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Initial prenatal evaluation and risk assessment</li>
              <li>Regular prenatal check-ups</li>
              <li>Ultrasound examinations</li>
              <li>Laboratory testing and screenings</li>
              <li>Nutrition and exercise guidance</li>
              <li>Management of pregnancy complications</li>
              <li>Childbirth preparation classes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Labor and Delivery</h2>
            <p className="mb-4">
              Santa Matilda provides a comfortable and safe environment for childbirth with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Modern delivery rooms with advanced medical equipment</li>
              <li>24/7 obstetric care with experienced obstetricians and midwives</li>
              <li>Natural childbirth options with minimal intervention when appropriate</li>
              <li>Pain management options including epidural anesthesia</li>
              <li>Emergency cesarean section capability</li>
              <li>Immediate newborn care</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">High-Risk Pregnancy Care</h2>
            <p className="mb-4">
              For pregnancies requiring special attention, we offer specialized care for conditions such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Gestational diabetes</li>
              <li>Preeclampsia and hypertension</li>
              <li>Multiple births</li>
              <li>Previous pregnancy complications</li>
              <li>Pre-existing maternal medical conditions</li>
              <li>Advanced maternal age</li>
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

export default ObstetricsService;
