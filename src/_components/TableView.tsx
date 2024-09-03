import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronDown, Edit, Search, Trash } from 'lucide-react';
import { useState } from 'react';

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

export default function TableView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTable, setSelectedTable] = useState(database.tables[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = selectedTable.data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleEdit = (id: any) => {
    console.log(`Edit row with id: ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id: any) => {
    console.log(`Delete row with id: ${id}`);
    // Implement delete functionality
  };
  return (
    <>
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
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
    </>
  );
}
