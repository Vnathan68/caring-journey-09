
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FileText, CalendarPlus, Mail, Phone } from 'lucide-react';
import { DoctorData } from '@/hooks/use-doctor-api';

interface DoctorTableProps {
  doctors: DoctorData[];
}

const DoctorTable: React.FC<DoctorTableProps> = ({ doctors }) => {
  const getStatusBadge = (status: 'active' | 'inactive' | 'on_leave') => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-50 text-green-600 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-slate-100 text-slate-600 border-slate-200">Inactive</Badge>;
      case 'on_leave':
        return <Badge className="bg-amber-50 text-amber-600 border-amber-200">On Leave</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-600 border-slate-200">Unknown</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Doctor</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Specialty</TableHead>
          <TableHead>License</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.map((doctor) => (
          <TableRow key={doctor.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-clinic-100 text-clinic-600">
                    {`${doctor.firstName.charAt(0)}${doctor.lastName.charAt(0)}`}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{`Dr. ${doctor.firstName} ${doctor.lastName}`}</div>
                  <div className="text-xs text-muted-foreground">ID: {doctor.id}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center text-sm">
                  <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                  {doctor.email}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                  {doctor.phone}
                </div>
              </div>
            </TableCell>
            <TableCell>{doctor.specialty}</TableCell>
            <TableCell>{doctor.licenseNumber}</TableCell>
            <TableCell>{doctor.startDate}</TableCell>
            <TableCell>{getStatusBadge(doctor.status)}</TableCell>
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

export default DoctorTable;
