import React, { useState } from 'react';

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
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Sleep Cycle Calculator</h2>
          <p className="text-sm text-gray-500">Optimize your sleep schedule</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Calculation Type</label>
            <select 
              className="w-full p-2 border rounded-md bg-background text-foreground"
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value)}
            >
              <option value="wakeUp">I have to wake up at</option>
              <option value="bedTime">I plan to go to bed at</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Time</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {/* You can replace this with an actual clock icon if available */}
                🕒
              </span>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pl-10 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <button 
            onClick={calculateSleepCycles} 
            className="w-full bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90"
          >
            Calculate
          </button>

          {results.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-lg">
                {calculationType === 'wakeUp' ? 'Suggested bedtimes:' : 'Suggested wake-up times:'}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {results.map((result, index) => (
                  <div key={index} className="p-4 bg-secondary rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">{result.time}</p>
                        <p className="text-sm text-muted-foreground">{result.duration} hrs of sleep</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">{result.cycles} cycles</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SleepCycleCalculator;
