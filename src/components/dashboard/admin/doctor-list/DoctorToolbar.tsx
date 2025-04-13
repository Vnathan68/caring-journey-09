
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus } from 'lucide-react';

interface DoctorToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onRegisterClick: () => void;
}

const DoctorToolbar: React.FC<DoctorToolbarProps> = ({
  searchQuery,
  onSearchChange,
  onRegisterClick
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search doctors..." 
          className="pl-9" 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
        
        <Button 
          className="bg-clinic-600 hover:bg-clinic-700 text-white flex items-center gap-2"
          onClick={onRegisterClick}
        >
          <Plus className="h-4 w-4" />
          <span>Register Doctor</span>
        </Button>
      </div>
    </div>
  );
};

export default DoctorToolbar;
