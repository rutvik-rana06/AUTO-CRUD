import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/_pages/Dashboard';
import TableDashboard from '@/_pages/TableDashboard';
import DatabaseInfo from '@/_components/DatabaseInfo';
import TableView from '@/_components/TableView';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/database/:dbName" element={<TableDashboard />}>
          // Add a nested route for database info
          <Route path="/database/:dbName/" element={<DatabaseInfo />} />
          // Add a nested route for table details
          <Route
            path="/database/:dbName/table/:tableName"
            element={<TableView />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
