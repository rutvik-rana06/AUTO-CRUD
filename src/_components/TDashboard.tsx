import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import {
  ChevronDown,
  Database,
  Edit,
  LogOut,
  Menu,
  Minus,
  Plus,
  Search,
  Trash,
  Table as TableIcon,
  X,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

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

export default function Component() {
  interface TableField {
    name: string;
    type: string;
  }
  const { dbName } = useParams();
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState(database.tables[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [newTableFields, setNewTableFields] = useState([
    { name: '', type: '' },
    { name: '', type: '' },
  ]);
  const [deleteTableName, setDeleteTableName] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const filteredData = selectedTable.data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleEdit = (id: any) => {
    console.log(`Edit row with id: ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id: any) => {
    console.log(`Delete row with id: ${id}`);
    // Implement delete functionality
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleTableSelect = (table: any) => {
    setSelectedTable(table);
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  };

  const handleAddField = () => {
    setNewTableFields([...newTableFields, { name: '', type: '' }]);
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

  const handleDeleteField = (index: any) => {
    if (newTableFields.length > 2) {
      const updatedFields = newTableFields.filter((_, i) => i !== index);
      setNewTableFields(updatedFields);
    }
  };

  const handleCreateTable = (event: any) => {
    event.preventDefault();
    console.log('Creating new table with fields:', newTableFields);
    // Implement table creation logic here
    setNewTableFields([
      { name: '', type: '' },
      { name: '', type: '' },
    ]);
  };

  const handleDeleteTable = () => {
    if (deleteTableName === selectedTable.name) {
      console.log(`Deleting table: ${selectedTable.name}`);
      // Implement table deletion logic here
      setIsDeleteDialogOpen(false);
      setDeleteTableName('');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Drawer */}
      <div
        className={`${
          isDrawerOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 ease-in-out overflow-hidden border-r bg-gray-100 flex flex-col`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">{dbName}</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="tables">
              <AccordionTrigger>Tables</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {database.tables.map((table) => (
                    <li key={table.name}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleTableSelect(table)}
                      >
                        {table.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="mt-auto p-4">
          <Dialog>
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
                  Define the fields for your new table. Click the plus button to
                  add more fields.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateTable}>
                <div className="grid gap-4 py-4">
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
                          <SelectItem value="string">String</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="boolean">Boolean</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
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
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddField}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Field
                  </Button>
                  <Button type="submit">Create Table</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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

      {/* Content */}
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
                <Button variant="destructive">Delete Table</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Table</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Please type the table name to
                    confirm.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tableName" className="text-right">
                      Table Name
                    </Label>
                    <Input
                      id="tableName"
                      value={deleteTableName}
                      onChange={(e) => setDeleteTableName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDeleteTable}
                    disabled={deleteTableName !== selectedTable.name}
                  >
                    Delete Table
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-4 flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => setRowsPerPage(Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rows per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 rows</SelectItem>
                <SelectItem value="10">10 rows</SelectItem>
                <SelectItem value="20">20 rows</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {selectedTable.columns.map((column) => (
                  <TableHead key={column}>
                    {column}
                    <ChevronDown className="ml-1 h-4 w-4 inline-block" />
                  </TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id}>
                  {selectedTable.columns.map((column) => (
                    <TableCell key={column}>
                      {/* {row[column.toLowerCase()]} */}
                      {row[column.toLowerCase() as keyof typeof row]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(row.id)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(row.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  // disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  // disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
