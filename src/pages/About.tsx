
import React from 'react';
import PageTransition from '@/components/ui-custom/page-transition';

const About: React.FC = () => {
  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">About Santa Matilda</h1>
        <p className="text-lg mb-10">
          Santa Matilda Birthing and Family Planning Clinic is a premier healthcare facility dedicated to women's health,
          obstetrics, and family planning services in Bulacan, Philippines.
        </p>
        
        {/* Placeholder content - would be replaced with actual content */}
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              To provide compassionate, comprehensive, and high-quality healthcare services to women of all ages,
              with a focus on maternal care, reproductive health, and family planning.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p>
              To be the leading women's healthcare provider in Bulacan, recognized for excellence in patient care,
              innovative medical practices, and community health education.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc pl-5 space-y-2">
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
