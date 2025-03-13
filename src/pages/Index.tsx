
import React from 'react';
import PageTransition from '@/components/ui-custom/page-transition';
import HeroSection from '@/components/home/hero-section';
import ServicesSection from '@/components/home/services-section';
import StatsSection from '@/components/home/stats-section';
import TestimonialsSection from '@/components/home/testimonials-section';
import CTASection from '@/components/home/cta-section';
import ClinicInfoSection from '@/components/home/clinic-info-section';

const Index: React.FC = () => {
  return (
    <PageTransition>
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
