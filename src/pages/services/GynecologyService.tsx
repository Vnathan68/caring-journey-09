
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Stethoscope, ClipboardCheck, Microscope, Shield } from 'lucide-react';
import PageTransition from '@/components/ui-custom/page-transition';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const GynecologyService: React.FC = () => {
  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-2">Gynecology Services</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Comprehensive healthcare services for women at every stage of life
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-clinic-50 flex items-center justify-center mb-4">
                <ClipboardCheck className="h-6 w-6 text-clinic-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Preventive Care</h3>
              <p className="text-muted-foreground">
                Regular check-ups and screenings to maintain reproductive health and detect issues early.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-clinic-50 flex items-center justify-center mb-4">
                <Microscope className="h-6 w-6 text-clinic-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diagnostic Services</h3>
              <p className="text-muted-foreground">
                Advanced diagnostic procedures to identify and address gynecological conditions.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-clinic-50 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-clinic-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Treatment</h3>
              <p className="text-muted-foreground">
                Comprehensive treatment options for various gynecological conditions and disorders.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Comprehensive Gynecology Care</h2>
            <p className="mb-4">
              Our gynecology team provides comprehensive care for women's health issues including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Annual well-woman exams</li>
              <li>Pap smears and cervical cancer screenings</li>
              <li>Breast examinations</li>
              <li>STI testing and treatment</li>
              <li>Menstrual disorder management</li>
              <li>Menopause management</li>
              <li>Treatment for conditions like PCOS, endometriosis, and fibroids</li>
              <li>Gynecological infection treatment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Diagnostic Procedures</h2>
            <p className="mb-4">
              We offer a range of diagnostic procedures to identify gynecological issues:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Colposcopy</li>
              <li>Endometrial biopsy</li>
              <li>Transvaginal ultrasound</li>
              <li>Hysteroscopy</li>
              <li>HPV testing</li>
              <li>Hormonal evaluations</li>
              <li>Comprehensive lab testing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Gynecological Surgeries</h2>
            <p className="mb-4">
              For conditions requiring surgical intervention, our experienced surgeons offer:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Minimally invasive laparoscopic procedures</li>
              <li>Hysterectomy (when necessary)</li>
              <li>Myomectomy for fibroid removal</li>
              <li>Endometrial ablation</li>
              <li>Dilation and curettage (D&C)</li>
              <li>Surgical management of ectopic pregnancy</li>
              <li>Ovarian cyst removal</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild className="bg-clinic-600 hover:bg-clinic-700 text-white">
            <Link to="/contact">Schedule an Appointment</Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default GynecologyService;
