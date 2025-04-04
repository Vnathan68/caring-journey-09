
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Users, User, UserPlus, MoreHorizontal, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MOCK_USERS } from '@/data/mock-users';
import { ROLES } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AdminUserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case ROLES.ADMIN: return 'bg-purple-100 text-purple-800';
      case ROLES.DOCTOR: return 'bg-blue-100 text-blue-800';
      case ROLES.SECRETARY_NURSE: return 'bg-teal-100 text-teal-800';
      case ROLES.PATIENT: return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch(role) {
      case ROLES.ADMIN: return 'Admin';
      case ROLES.DOCTOR: return 'Doctor';
      case ROLES.SECRETARY_NURSE: return 'Secretary/Nurse';
      case ROLES.PATIENT: return 'Patient';
      default: return role;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage patients, doctors, and staff</CardDescription>
            </div>
            <Button className="bg-clinic-600 hover:bg-clinic-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                All Users
              </TabsTrigger>
              <TabsTrigger value="patients" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Patients
              </TabsTrigger>
              <TabsTrigger value="staff" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Staff
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value={ROLES.ADMIN}>Admin</SelectItem>
                    <SelectItem value={ROLES.DOCTOR}>Doctor</SelectItem>
                    <SelectItem value={ROLES.SECRETARY_NURSE}>Secretary/Nurse</SelectItem>
                    <SelectItem value={ROLES.PATIENT}>Patient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_150px_120px] py-3 px-4 font-medium border-b hidden md:grid">
                  <div>Name</div>
                  <div>Email</div>
                  <div>Role</div>
                  <div className="text-right">Actions</div>
                </div>

                {filteredUsers.length > 0 ? (
                  <div className="divide-y">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_150px_120px] py-3 px-4 items-center">
                        <div className="font-medium md:font-normal">{user.name}</div>
                        <div className="text-muted-foreground">{user.email}</div>
                        <div>
                          <Badge variant="outline" className={`${getRoleBadgeColor(user.role)}`}>
                            {getRoleLabel(user.role)}
                          </Badge>
                        </div>
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-muted-foreground">
                    No users found matching your filters.
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="patients" className="space-y-4">
              <div className="py-12 text-center text-muted-foreground">
                Patient management will be available soon.
              </div>
            </TabsContent>
            
            <TabsContent value="staff" className="space-y-4">
              <div className="py-12 text-center text-muted-foreground">
                Staff management will be available soon.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {MOCK_USERS.length} users
          </div>
          <Button variant="outline">Export Users</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminUserManagement;
