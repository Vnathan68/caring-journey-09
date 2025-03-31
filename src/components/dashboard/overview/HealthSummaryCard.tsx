
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const HealthSummaryCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Health Summary</CardTitle>
        <CardDescription>Recent metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Blood Pressure</span>
              <span className="text-sm font-medium">120/80</span>
            </div>
            <Progress value={70} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Weight</span>
              <span className="text-sm font-medium">65 kg</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Heart Rate</span>
              <span className="text-sm font-medium">72 bpm</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        </div>
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => window.location.href = '/dashboard/records'}
          >
            View Full Health Records
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthSummaryCard;
