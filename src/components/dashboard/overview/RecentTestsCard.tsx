
import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface TestType {
  id: string;
  name: string;
  date: Date;
  status: string;
  hasAbnormalities: boolean | null;
}

interface RecentTestsCardProps {
  recentTests: TestType[];
}

const RecentTestsCard: React.FC<RecentTestsCardProps> = ({ recentTests }) => {
  const handleViewTest = (id: string) => {
    toast({
      title: "Viewing test results",
      description: "Redirecting to your test results...",
    });
    window.location.href = '/dashboard/records';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">Recent Test Results</CardTitle>
            <CardDescription>Your latest medical tests</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground" 
            onClick={() => window.location.href = '/dashboard/records'}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentTests.map(test => (
            <div key={test.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{test.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {test.date.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {test.status === 'completed' ? (
                  <Badge variant={test.hasAbnormalities ? "destructive" : "secondary"} className="ml-2">
                    {test.hasAbnormalities ? "Review" : "Normal"}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="ml-2">Pending</Badge>
                )}
                {test.status === 'completed' && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-1 text-muted-foreground" 
                    onClick={() => handleViewTest(test.id)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => window.location.href = '/dashboard/records'}
          >
            View All Test Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTestsCard;
