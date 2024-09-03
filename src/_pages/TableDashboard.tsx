import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Database, LogOut, Menu, X } from 'lucide-react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import CreateTable from '@/_components/CreateTable';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Mock data structure
const database = {
  name: 'Users Database',
  tables: [
    {
      name: 'Users',
      columns: ['ID', 'Name', 'Email', 'Role'],
      data: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
        {
          id: 4,
          name: 'Alice Brown',
          email: 'alice@example.com',
          role: 'Manager',
        },
        {
          id: 5,
          name: 'Charlie Davis',
          email: 'charlie@example.com',
          role: 'User',
        },
      ],
    },
    {
      name: 'Orders',
      columns: ['Order ID', 'User ID', 'Product', 'Quantity'],
      data: [
        { id: 101, userId: 2, product: 'Widget A', quantity: 5 },
        { id: 102, userId: 1, product: 'Gadget B', quantity: 2 },
        { id: 103, userId: 3, product: 'Widget A', quantity: 1 },
        { id: 104, userId: 4, product: 'Gadget C', quantity: 3 },
        { id: 105, userId: 2, product: 'Widget B', quantity: 4 },
      ],
    },
  ],
};

import { useLocation } from 'react-router-dom'; // Import useLocation to get the current route

export default function Component() {
  const { dbName, tableName } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [selectedTable, setSelectedTable] = useState(database.tables[0]);
  const [databaseInfo, setDatabaseInfo] = useState<any>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteName, setDeleteName] = useState('');

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTableSelect = (table: any) => {
    navigate(`/database/${dbName}/table/${table}`);
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  };

  const handleDelete = () => {
    if (location.pathname.includes('/table/')) {
      console.log(`Deleting table: ${selectedTable.name}`);
      // Implement table deletion logic here
    } else {
      console.log(`Deleting database: ${dbName}`);
      // Implement database deletion logic here
    }
    setIsDeleteDialogOpen(false);
    setDeleteName('');
  };

  async function fetchDatabase() {
    try {
      const response = await fetch(
        `http://localhost:4000/databases/${dbName}/info`
      );
      const data = await response.json();
      setDatabaseInfo(data);
    } catch (error) {
      console.error('Error fetching database:', error);
    }
  }

  useEffect(() => {
    fetchDatabase();
  }, [dbName]);

  console.log(databaseInfo);

  return (
    <div className="flex h-screen">
      {/* Drawer */}
      <div
        className={`${
          isDrawerOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 ease-in-out overflow-hidden border-r bg-gray-100 flex flex-col`}
      >
        <div className="p-4">
          <h2
            className="text-xl font-bold mb-4 cursor-pointer"
            onClick={() => navigate('/database/' + dbName)}
          >
            {dbName}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="tables">
              <AccordionTrigger>Tables</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {databaseInfo?.tables?.map((table: string) => (
                    <li key={table}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleTableSelect(table)}
                      >
                        {table}
                      </Button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="mt-auto p-4">
          <CreateTable fetchDatabase={fetchDatabase} />
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full justify-start"
          >
            <Database className="mr-2 h-4 w-4" />
            <span>Exit Database</span>
            <LogOut className="ml-auto h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDrawer}
            className="mr-2"
          >
            {isDrawerOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
          <h2 className="text-2xl font-bold">{selectedTable.name}</h2>
          <div className="ml-auto space-x-2">
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="destructive">
                  {location.pathname.includes('/table/')
                    ? 'Delete Table'
                    : 'Delete Database'}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {location.pathname.includes('/table/')
                      ? 'Delete Table'
                      : 'Delete Database'}
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Please type the{' '}
                    {location.pathname.includes('/table/')
                      ? 'table'
                      : 'database'}{' '}
                    name to confirm.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deleteName" className="text-right">
                      {location.pathname.includes('/table/')
                        ? 'Table'
                        : 'Database'}{' '}
                      Name
                    </Label>
                    <Input
                      id="deleteName"
                      value={deleteName}
                      onChange={(e) => setDeleteName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={
                      location.pathname.includes('/table/')
                        ? deleteName !== selectedTable.name
                        : deleteName !== dbName
                    }
                  >
                    {location.pathname.includes('/table/')
                      ? 'Delete Table'
                      : 'Delete Database'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
