
import React from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PregnancyProgressCardProps {
  gestationalAge: number;
  dueDate: Date;
}

const PregnancyProgressCard: React.FC<PregnancyProgressCardProps> = ({
  gestationalAge,
  dueDate
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">Pregnancy Progress</CardTitle>
            <CardDescription>Week {gestationalAge} of 40</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground" 
            onClick={() => window.location.href = '/dashboard/pregnancy'}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Progress value={(gestationalAge / 40) * 100} className="h-2" />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>1st Trimester</span>
            <span>2nd Trimester</span>
            <span>3rd Trimester</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-clinic-50 p-3 rounded-full">
            <Heart className="h-6 w-6 text-clinic-600" />
          </div>
          <div>
            <p className="font-medium">Week {gestationalAge}</p>
            <p className="text-sm text-muted-foreground">
              Due date: {dueDate.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
            </p>
            <p className="text-sm text-muted-foreground">Second Trimester</p>
          </div>
        </div>
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => window.location.href = '/dashboard/pregnancy'}
          >
            View Pregnancy Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PregnancyProgressCard;
