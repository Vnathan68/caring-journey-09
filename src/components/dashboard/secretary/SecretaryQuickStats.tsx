
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const SecretaryQuickStats: React.FC = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: "Total Appointments",
      value: "28",
      icon: Calendar,
      iconColor: "text-blue-500",
      iconBgColor: "bg-blue-100",
      change: "+12% from last week",
      changeUp: true
    },
    {
      title: "Patients Today",
      value: "12",
      icon: Users,
      iconColor: "text-green-500",
      iconBgColor: "bg-green-100",
      change: "On track with schedule",
      changeUp: true
    },
    {
      title: "Waiting Time",
      value: "15 min",
      icon: Clock,
      iconColor: "text-amber-500",
      iconBgColor: "bg-amber-100",
      change: "5 min better than goal",
      changeUp: true
    },
    {
      title: "Urgent Cases",
      value: "2",
      icon: AlertTriangle,
      iconColor: "text-red-500",
      iconBgColor: "bg-red-100",
      change: "Requires attention",
      changeUp: false
    },
    {
      title: "Completed Today",
      value: "8",
      icon: CheckCircle,
      iconColor: "text-clinic-600",
      iconBgColor: "bg-clinic-100",
      change: "33% of daily schedule",
      changeUp: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.iconBgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
          <CardFooter>
            <p className={`text-xs ${stat.changeUp ? 'text-green-500' : 'text-amber-500'}`}>
              {stat.change}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SecretaryQuickStats;
