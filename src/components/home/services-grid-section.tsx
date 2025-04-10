
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Baby, 
  Heart, 
  Stethoscope, 
  Calendar, 
  PieChart, 
  FileSearch, 
  TestTube, 
  Users, 
  Pill, 
  Syringe, 
  ShieldPlus, 
  Hospital, 
  Scissors, 
  ArrowRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, href }) => {
  return (
    <Link
      to={href}
      className="flex flex-col items-center p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] text-center h-full"
    >
      <div className="inline-flex items-center justify-center p-3 bg-clinic-50 dark:bg-slate-700 text-clinic-600 dark:text-clinic-300 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
};

const ServicesGridSection: React.FC = () => {
  const services = [
    {
      title: "Safe Normal Delivery",
      description: "Expert care for a smooth childbirth experience in a comfortable setting",
      icon: <Baby className="h-6 w-6" />,
      href: "/services/obstetrics"
    },
    {
      title: "Newborn Screening",
      description: "Comprehensive testing to detect health conditions early in newborns",
      icon: <PieChart className="h-6 w-6" />,
      href: "/services/pediatrics"
    },
    {
      title: "Maternal and Child Health",
      description: "Complete healthcare solutions for mothers and their children",
      icon: <Heart className="h-6 w-6" />,
      href: "/services/obstetrics"
    },
    {
      title: "Prenatal Check-up",
      description: "Regular monitoring and care throughout your pregnancy journey",
      icon: <Calendar className="h-6 w-6" />,
      href: "/services/obstetrics"
    },
    {
      title: "Postnatal Check-up",
      description: "Ensuring mother and baby's health and well-being after delivery",
      icon: <Stethoscope className="h-6 w-6" />,
      href: "/services/obstetrics"
    },
    {
      title: "Ear Piercing",
      description: "Safe and hygienic ear piercing services for all ages",
      icon: <Scissors className="h-6 w-6" />,
      href: "/services/general"
    },
    {
      title: "Pap Smear",
      description: "Essential screening test for early detection of cervical cancer",
      icon: <FileSearch className="h-6 w-6" />,
      href: "/services/gynecology"
    },
    {
      title: "Pregnancy Test",
      description: "Quick and reliable pregnancy testing with professional guidance",
      icon: <TestTube className="h-6 w-6" />,
      href: "/services/obstetrics"
    },
    {
      title: "Family Planning",
      description: "Comprehensive counseling on various family planning options",
      icon: <Users className="h-6 w-6" />,
      href: "/services/family-planning"
    },
    {
      title: "IUD Insertion/Removal",
      description: "Expert IUD services provided by experienced healthcare professionals",
      icon: <ShieldPlus className="h-6 w-6" />,
      href: "/services/family-planning"
    },
    {
      title: "Pill Dispensing",
      description: "Convenient access to oral contraceptives with proper guidance",
      icon: <Pill className="h-6 w-6" />,
      href: "/services/family-planning"
    },
    {
      title: "Injectables",
      description: "Hormonal contraceptive injections administered by trained staff",
      icon: <Syringe className="h-6 w-6" />,
      href: "/services/family-planning"
    },
    {
      title: "Condom",
      description: "Access to barrier contraceptives with educational resources",
      icon: <ShieldPlus className="h-6 w-6" />,
      href: "/services/family-planning"
    },
    {
      title: "Norplant",
      description: "Long-acting reversible contraceptive implant options",
      icon: <Pill className="h-6 w-6" />,
      href: "/services/family-planning"
    },
    {
      title: "Referral for BTL",
      description: "Information and referral services for Bilateral Tubal Ligation",
      icon: <ArrowRight className="h-6 w-6" />,
      href: "/services/family-planning"
    },
    {
      title: "Backup Physician & Referral",
      description: "Access to our network of specialists and partnered hospitals",
      icon: <Hospital className="h-6 w-6" />,
      href: "/services/general"
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-clinic-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Comprehensive Services</h2>
          <p className="text-muted-foreground text-lg">
            Providing specialized care for women and families at every stage of life
          </p>
        </div>
        
        <div className={cn(
          "grid gap-6",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        )}>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              href={service.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGridSection;
