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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Minus, Plus, TableIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface IProps {
  fetchDatabase: () => void;
}

export default function CreateTable({ fetchDatabase }: IProps) {
  interface TableField {
    name: string;
    type: string;
  }

  const [tableName, setTableName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [newTableFields, setNewTableFields] = useState<TableField[]>([
    { name: '', type: '' },
    { name: '', type: '' },
  ]);

  const handleCreateTable = async (event: React.FormEvent) => {
    event.preventDefault();

    const requestBody = {
      tableName,
      columns: newTableFields,
    };

    try {
      const response = await fetch(
        'http://localhost:4000/databases/Hotel/table',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Table created successfully:', data);
        // Reset state after successful creation
        setTableName('');
        setNewTableFields([
          { name: '', type: '' },
          { name: '', type: '' },
        ]);
        setIsOpen(false);
        toast.success('Table created successfully');
        fetchDatabase();
      } else {
        console.error('Error creating table:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  const handleFieldChange = (
    index: number,
    key: keyof TableField,
    value: string
  ) => {
    const updatedFields = [...newTableFields];
    updatedFields[index][key] = value;
    setNewTableFields(updatedFields);
  };

  const handleDeleteField = (index: number) => {
    if (newTableFields.length > 2) {
      const updatedFields = newTableFields.filter((_, i) => i !== index);
      setNewTableFields(updatedFields);
    }
  };

  const handleAddField = () => {
    setNewTableFields([...newTableFields, { name: '', type: '' }]);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full justify-start mb-2">
            <TableIcon className="mr-2 h-4 w-4" />
            <span>Create Table</span>
            <Plus className="ml-auto h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Table</DialogTitle>
            <DialogDescription>
              Define the fields for your new table. Click the plus button to add
              more fields.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateTable}>
            <div className="grid gap-4 py-4">
              <Input
                id="table-name"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="Table Name"
                required
                className="w-[95%]"
              />
              {newTableFields.map((field, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr,1fr,auto] items-center gap-4"
                >
                  <Input
                    id={`name-${index}`}
                    value={field.name}
                    onChange={(e) =>
                      handleFieldChange(index, 'name', e.target.value)
                    }
                    placeholder="Field Name"
                    required
                  />
                  <Select
                    value={field.type}
                    onValueChange={(value) =>
                      handleFieldChange(index, 'type', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Field Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INT AUTO_INCREMENT PRIMARY KEY">
                        INT AUTO_INCREMENT PRIMARY KEY
                      </SelectItem>
                      <SelectItem value="INT">INT</SelectItem>
                      <SelectItem value="SMALLINT">SMALLINT</SelectItem>
                      <SelectItem value="BIGINT">BIGINT</SelectItem>
                      <SelectItem value="FLOAT">FLOAT</SelectItem>
                      <SelectItem value="VARCHAR(255)">VARCHAR(255)</SelectItem>
                      <SelectItem value="BOOLEAN">Boolean</SelectItem>
                      <SelectItem value="DATE">Date</SelectItem>
                      <SelectItem value="TIME">Time</SelectItem>
                      <SelectItem value="DATETIME">DateTime</SelectItem>
                    </SelectContent>
                  </Select>
                  {index >= 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteField(index)}
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Delete Field</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleAddField}>
                <Plus className="mr-2 h-4 w-4" />
                Add Field
              </Button>
              <Button type="submit">Create Table</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
