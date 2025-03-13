
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, ArrowRight, FileText, Heart, Weight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const HealthSummary: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Health Summary</CardTitle>
        <CardDescription>Track your pregnancy journey and health metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pregnancy Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Pregnancy Progress</h3>
            <span className="text-sm text-muted-foreground">Week 22 of 40</span>
          </div>
          <Progress value={55} className="h-2 bg-slate-100" />
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Trimester</p>
              <p className="font-medium">Second</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Due Date</p>
              <p className="font-medium">Sep 15, 2023</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Baby Size</p>
              <p className="font-medium">Papaya</p>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div>
          <h3 className="font-medium mb-4">Health Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="bg-red-50 rounded-full p-2">
                <Heart className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Blood Pressure</p>
                <p className="font-medium">120/80 mmHg</p>
                <p className="text-xs text-muted-foreground">Last checked: May 15, 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="bg-blue-50 rounded-full p-2">
                <Weight className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-medium">65 kg</p>
                <p className="text-xs text-muted-foreground">Last checked: May 15, 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="bg-green-50 rounded-full p-2">
                <Activity className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Fetal Heart Rate</p>
                <p className="font-medium">150 bpm</p>
                <p className="text-xs text-muted-foreground">Last checked: May 15, 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="bg-purple-50 rounded-full p-2">
                <FileText className="h-5 w-5 text-purple-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Next Screenings</p>
                <p className="font-medium">Glucose Test</p>
                <p className="text-xs text-muted-foreground">Scheduled: Jun 5, 2023</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="font-medium mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <div className="bg-clinic-50 rounded-full p-2">
                <Heart className="h-5 w-5 text-clinic-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Continue taking prenatal vitamins</p>
                <p className="text-sm text-muted-foreground">
                  Folic acid, iron, and calcium are essential for your baby's development
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-clinic-600">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <div className="bg-clinic-50 rounded-full p-2">
                <Activity className="h-5 w-5 text-clinic-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Maintain light exercise</p>
                <p className="text-sm text-muted-foreground">
                  Walking and prenatal yoga can help prepare for delivery
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-clinic-600">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline">View Full Health Record</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthSummary;
