
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FileText, CalendarPlus, Mail, Phone } from 'lucide-react';
import { PatientData } from '@/hooks/use-patient-api';

interface PatientTableProps {
  patients: PatientData[];
}

const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
  const getStatusBadge = (status: 'active' | 'inactive' | 'pending' | undefined) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-50 text-green-600 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-slate-100 text-slate-600 border-slate-200">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-amber-50 text-amber-600 border-amber-200">Pending</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-600 border-slate-200">Unknown</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Date of Birth</TableHead>
          <TableHead>Insurance</TableHead>
          <TableHead>Last Visit</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-clinic-100 text-clinic-600">
                    {`${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{`${patient.firstName} ${patient.lastName}`}</div>
                  <div className="text-xs text-muted-foreground">ID: {patient.id}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center text-sm">
                  <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                  {patient.email}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                  {patient.phone}
                </div>
              </div>
            </TableCell>
            <TableCell>{patient.dateOfBirth}</TableCell>
            <TableCell>{patient.insuranceProvider}</TableCell>
            <TableCell>{patient.lastVisit}</TableCell>
            <TableCell>{getStatusBadge(patient.status)}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-8 px-2">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 px-2">
                  <CalendarPlus className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PatientTable;
