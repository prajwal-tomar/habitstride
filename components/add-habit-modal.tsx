import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface AddHabitModalProps {
  onClose: () => void;
}

export function AddHabitModal({ onClose }: AddHabitModalProps) {
  const [habitName, setHabitName] = useState('');
  const [habitFrequency, setHabitFrequency] = useState('daily');
  const [reminderTime, setReminderTime] = useState('');
  const [habitDescription, setHabitDescription] = useState('');

  function handleSubmit() {
    // Handle form submission logic here
    console.log({
      habitName,
      habitFrequency,
      reminderTime,
      habitDescription,
    });
    onClose();
  }

  return (
    <Dialog  onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
          <DialogClose onClick={onClose} />
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Habit Name"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            required
          />
          <Select value={habitFrequency} onValueChange={setHabitFrequency}>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="specific-days">Specific Days</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="time"
            placeholder="Reminder Time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
          <Textarea
            placeholder="Habit Description"
            value={habitDescription}
            onChange={(e) => setHabitDescription(e.target.value)}
          />
          <Button onClick={handleSubmit} className="w-full">
            Add Habit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}