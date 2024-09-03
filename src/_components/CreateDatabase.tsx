import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function CreateDatabase({
  onCreate,
}: {
  onCreate: (name: string, tables: number) => void;
}) {
  const [name, setName] = useState('');
  const [tables, setTables] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to control dialog open/close

  const handleSubmit = () => {
    if (name && tables) {
      onCreate(name, parseInt(tables, 10));
      setName('');
      setTables('');
      setIsOpen(false); // Close the dialog after submission
      toast.success('Database created successfully');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="h-24 w-24">
          <Plus className="h-12 w-12" />
          <span className="sr-only">Add new database</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Database</DialogTitle>
          <DialogDescription>
            Launch a streamlined dialog to quickly set up a new database with
            just a few clicks.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              placeholder="Name of database"
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tables" className="text-right">
              Tables
            </Label>
            <Input
              id="tables"
              value={tables}
              placeholder="Number of Tables"
              onChange={(e) => setTables(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Create Database</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
