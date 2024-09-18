import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Moon, Sun, Clock } from 'lucide-react';

const SleepCycleCalculator = () => {
  const [calculationType, setCalculationType] = useState('wakeUp');
  const [time, setTime] = useState('');
  const [results, setResults] = useState([]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const calculateSleepCycles = () => {
    if (!time) return;

    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    const sleepCycles = [];
    for (let i = 6; i >= 3; i--) {
      const cycleTime = new Date(date.getTime());
      const sleepDuration = i * 90; // 90 minutes per sleep cycle
      
      if (calculationType === 'wakeUp') {
        cycleTime.setMinutes(cycleTime.getMinutes() - sleepDuration);
      } else {
        cycleTime.setMinutes(cycleTime.getMinutes() + sleepDuration);
      }

      const cycleTimeString = formatTime(cycleTime);
      
      sleepCycles.push({
        time: cycleTimeString,
        cycles: i,
        duration: sleepDuration / 60
      });
    }

    setResults(sleepCycles);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Sleep Cycle Calculator</CardTitle>
        <CardDescription className="text-center">Optimize your sleep schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Calculation Type</label>
            <Select onValueChange={(value) => setCalculationType(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select calculation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wakeUp">
                  <div className="flex items-center">
                    <Sun className="w-4 h-4 mr-2" />
                    I have to wake up at
                  </div>
                </SelectItem>
                <SelectItem value="bedTime">
                  <div className="flex items-center">
                    <Moon className="w-4 h-4 mr-2" />
                    I plan to go to bed at
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          <Button onClick={calculateSleepCycles} className="w-full">Calculate</Button>

          {results.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-lg">
                {calculationType === 'wakeUp' ? 'Suggested bedtimes:' : 'Suggested wake-up times:'}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {results.map((result, index) => (
                  <Card key={index} className="p-4 bg-secondary">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">{result.time}</p>
                        <p className="text-sm text-muted-foreground">{result.duration} hrs of sleep</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">{result.cycles} cycles</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepCycleCalculator;
