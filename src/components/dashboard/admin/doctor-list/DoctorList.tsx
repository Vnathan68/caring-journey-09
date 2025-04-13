
import React, { useState } from 'react';
import { useDoctorList, DoctorData } from '@/hooks/use-doctor-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import DoctorTable from './DoctorTable';
import DoctorToolbar from './DoctorToolbar';
import { useNavigate } from 'react-router-dom';

const DoctorList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const { data, isLoading, error } = useDoctorList();
  const navigate = useNavigate();

  const doctors = data?.data || [];

  const filteredDoctors = doctors.filter(doctor => {
    const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || 
           doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
           doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleRegisterClick = () => {
    setRegisterDialogOpen(true);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-36" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="mb-4 text-red-500">Error loading doctors: {error.message}</div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DoctorToolbar 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange}
        onRegisterClick={handleRegisterClick}
      />
      
      <DoctorTable doctors={filteredDoctors} />
    </div>
  );
};

export default DoctorList;
