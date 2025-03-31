
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import PageTransition from '@/components/ui-custom/page-transition';
import LoadingSpinner from '@/components/ui-custom/loading-spinner';
import AppointmentBooking from '@/components/dashboard/appointments/AppointmentBooking';
import DashboardHeader from '@/components/dashboard/overview/DashboardHeader';
import ImportantAnnouncementBanner from '@/components/dashboard/overview/ImportantAnnouncementBanner';
import NextAppointmentCard from '@/components/dashboard/overview/NextAppointmentCard';
import PregnancyProgressCard from '@/components/dashboard/overview/PregnancyProgressCard';
import HealthSummaryCard from '@/components/dashboard/overview/HealthSummaryCard';
import RecentTestsCard from '@/components/dashboard/overview/RecentTestsCard';
import PaymentOverviewCard from '@/components/dashboard/overview/PaymentOverviewCard';
import AnnouncementsCard from '@/components/dashboard/overview/AnnouncementsCard';

type AnnouncementPriority = 'high' | 'normal' | 'low';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  
  const isPregnant = true;
  const gestationalAge = 22;
  const dueDate = new Date('2023-09-15');
  
  const upcomingAppointments = [
    {
      id: 'apt-1',
      type: 'Prenatal Checkup',
      provider: 'Dr. Maria Santos',
      date: new Date('2023-05-28T10:00:00'),
      status: 'confirmed'
    },
    {
      id: 'apt-2',
      type: 'Ultrasound',
      provider: 'Dr. James Wilson',
      date: new Date('2023-06-15T14:30:00'),
      status: 'confirmed'
    }
  ];
  
  const recentTests = [
    {
      id: 'test-1',
      name: 'Blood Test',
      date: new Date('2023-05-15'),
      status: 'completed',
      hasAbnormalities: false
    },
    {
      id: 'test-2',
      name: 'Glucose Tolerance',
      date: new Date('2023-05-20'),
      status: 'pending',
      hasAbnormalities: null
    }
  ];
  
  const pendingPayments = [
    {
      id: 'inv-1',
      description: 'Office Visit',
      amount: 75.00,
      dueDate: new Date('2023-06-01'),
      isOverdue: false
    },
    {
      id: 'inv-2',
      description: 'Lab Services',
      amount: 120.00,
      dueDate: new Date('2023-05-15'),
      isOverdue: true
    }
  ];
  
  const announcements = [
    {
      id: 'ann-1',
      title: 'Holiday Hours',
      content: 'The clinic will be closed on May 29th for Memorial Day.',
      date: new Date('2023-05-20'),
      priority: 'normal' as AnnouncementPriority,
      isRead: false
    },
    {
      id: 'ann-2',
      title: 'New Prenatal Classes',
      content: 'We are now offering virtual prenatal yoga classes. Register today!',
      date: new Date('2023-05-18'),
      priority: 'low' as AnnouncementPriority,
      isRead: true
    }
  ];

  if (!user) {
    return <LoadingSpinner />;
  }
  
  const handleBookAppointment = () => {
    setShowAppointmentModal(true);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <DashboardHeader 
          userName={user.name} 
          onBookAppointment={handleBookAppointment} 
        />

        <ImportantAnnouncementBanner announcements={announcements} />

        {/* Dashboard cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NextAppointmentCard 
            upcomingAppointments={upcomingAppointments} 
            onBookAppointment={handleBookAppointment} 
          />

          {isPregnant ? (
            <PregnancyProgressCard 
              gestationalAge={gestationalAge} 
              dueDate={dueDate} 
            />
          ) : (
            <HealthSummaryCard />
          )}

          <RecentTestsCard recentTests={recentTests} />
        </div>

        <PaymentOverviewCard pendingPayments={pendingPayments} />
        
        <AnnouncementsCard announcements={announcements} />
        
        {/* Appointment Booking Modal */}
        <AppointmentBooking 
          isOpen={showAppointmentModal} 
          onClose={() => setShowAppointmentModal(false)} 
        />
      </div>
    </PageTransition>
  );
};

export default PatientDashboard;
