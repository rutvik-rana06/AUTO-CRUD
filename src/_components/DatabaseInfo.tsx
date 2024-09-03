import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DatabaseInfo() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Database Information</CardTitle>
          <CardDescription>Overview of your database</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <p>Database Name: {databaseInfo?.database} </p>
          <p>Total Tables: {databaseInfo?.totalTables}</p> */}
          <p>Database Name: My Database</p>
          <p>Total Tables: 10</p>
          <p>Total Records: 10,000+</p>
          <p>Last Updated: 2023-10-15</p>
        </CardContent>
      </Card>
    </>
  );
}
