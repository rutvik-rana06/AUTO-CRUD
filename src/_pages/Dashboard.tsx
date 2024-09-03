import { useNavigate } from 'react-router-dom';
import { CreateDatabase } from '@/_components/CreateDatabase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Database, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Component() {
  const navigate = useNavigate();

  const [databases, setDatabases] = useState<
    { name: string; tables: number }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch database list from the backend
  useEffect(() => {
    async function fetchDatabases() {
      try {
        const response = await fetch('http://localhost:4000/databases'); // Adjust the URL as necessary
        const data: string[] = await response.json();
        const dbs = data.map((name) => ({
          name,
          tables: Math.floor(Math.random() * 10) + 1, // Random number of tables
        }));
        setDatabases(dbs);
      } catch (error) {
        console.error('Error fetching databases:', error);
      }
    }

    fetchDatabases();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle card click and navigate
  const handleCardClick = (dbName: string) => {
    const formattedName = dbName.replace(/\s+/g, ''); // Remove spaces and lowercase
    navigate(`/database/${formattedName}`);
  };

  // Filter databases based on search query
  const filteredDatabases = databases.filter((db) =>
    db.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle database creation
  const handleCreateDatabase = async (name: string, tables: number) => {
    try {
      const response = await fetch('http://localhost:4000/databases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        // Update local state with the newly created database
        setDatabases((prev) => [
          ...prev,
          {
            name,
            tables,
          },
        ]);
      } else {
        console.error('Failed to create database');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-2xl font-bold">AUTO-CRUD</h1>
          <div className="ml-auto flex items-center space-x-4">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8 md:w-[300px] lg:w-[300px]"
                placeholder="Search..."
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
            <Avatar>
              <AvatarImage alt="User avatar" src="/placeholder-avatar.jpg" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredDatabases.map((db, index) => (
            <Card key={index} onClick={() => handleCardClick(db.name)}>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Database className="h-12 w-12 mb-2 text-primary" />
                <h2 className="text-xl font-semibold">{db.name}</h2>
                <p className="text-muted-foreground">{db.tables} Tables</p>
              </CardContent>
            </Card>
          ))}
          <Card className="flex items-center justify-center">
            <CardContent className="pt-6">
              <CreateDatabase onCreate={handleCreateDatabase} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
