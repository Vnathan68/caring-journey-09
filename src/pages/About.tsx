
import React from 'react';
import PageTransition from '@/components/ui-custom/page-transition';

const About: React.FC = () => {
  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-8">About Santa Matilda</h1>
        <p className="text-xl mb-12 max-w-4xl leading-relaxed">
          Santa Matilda Birthing and Family Planning Clinic is a premier healthcare facility dedicated to women's health,
          obstetrics, and family planning services in Bulacan, Philippines.
        </p>
        
        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed max-w-4xl">
              To provide compassionate, comprehensive, and high-quality healthcare services to women of all ages,
              with a focus on maternal care, reproductive health, and family planning.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-semibold mb-6">Our Vision</h2>
            <p className="text-lg leading-relaxed max-w-4xl">
              To be the leading women's healthcare provider in Bulacan, recognized for excellence in patient care,
              innovative medical practices, and community health education.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-semibold mb-6">Our Values</h2>
            <ul className="list-disc pl-8 space-y-4 text-lg max-w-4xl">
              <li>Patient-centered care</li>
              <li>Excellence in medical practice</li>
              <li>Compassion and empathy</li>
              <li>Integrity and ethics</li>
              <li>Continuous improvement</li>
              <li>Community engagement</li>
            </ul>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
