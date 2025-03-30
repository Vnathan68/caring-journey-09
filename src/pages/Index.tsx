
import React from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import HeroSection from '@/components/home/hero-section';
import ServicesSection from '@/components/home/services-section';
import StatsSection from '@/components/home/stats-section';
import TestimonialsSection from '@/components/home/testimonials-section';
import CTASection from '@/components/home/cta-section';
import ClinicInfoSection from '@/components/home/clinic-info-section';
import { Helmet } from 'react-helmet-async';

const Index: React.FC = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Santa Matilda - Specialized Women's Healthcare</title>
        <meta name="description" content="Santa Matilda Clinic provides specialized healthcare for women, including obstetrics, gynecology, and family planning services." />
      </Helmet>
      
      {/* Main page sections in logical order */}
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <ClinicInfoSection />
    </PageTransition>
  );
};

export default Index;
