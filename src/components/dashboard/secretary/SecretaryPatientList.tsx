
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { usePatientList, PatientData } from '@/hooks/use-patient-api';
import { useToast } from '@/components/ui/use-toast';
import PatientTable from './patient-list/PatientTable';
import PatientRegistrationForm from './patient-list/PatientRegistrationForm';
import PatientListToolbar from './patient-list/PatientListToolbar';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingSpinner from '@/components/ui-custom/loading-spinner';

const SecretaryPatientList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

  const { toast } = useToast();
  const { data: patients = [], isLoading, isError } = usePatientList({
    meta: {
      onError: (error) => {
        toast({
          title: "Error Loading Patients",
          description: error.message || "Failed to load patient list",
          variant: "destructive"
        });
      }
    }
  });

  const filteredPatients = patients.filter(patient => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery)
    );
  });

  return (
    <div className="space-y-4">
      <PatientListToolbar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRegisterClick={() => setRegisterDialogOpen(true)}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Patient Directory</CardTitle>
          <CardDescription>View and manage patient records</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col space-y-3">
              <div className="flex justify-center my-8">
                <LoadingSpinner size="lg" color="primary" />
              </div>
            </div>
          ) : isError ? (
            <div className="text-center p-4 text-destructive">
              Error loading patient data. Please try again later.
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="text-center p-4 text-muted-foreground">
              No patients found matching your search criteria.
            </div>
          ) : (
            <PatientTable patients={filteredPatients} />
          )}
          
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
      
      <PatientRegistrationForm 
        isOpen={registerDialogOpen} 
        onClose={() => setRegisterDialogOpen(false)} 
      />
    </div>
  );
};

export default SecretaryPatientList;
