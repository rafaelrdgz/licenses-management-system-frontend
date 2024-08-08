import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  CenterProfile,
  EntityForm,
  EntityTable,
  ExamsForm,
  ExamsTable,
  ClientsForm,
  ClientsTable,
  DriversForm,
  DriversTable,
  LicensesForm,
  LicensesTable,
  InfractionsForm,
  InfractionsTable,
  Notifications,
  Reports,
  DriverReport,
  EntityReport
} from "./scenes";



const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/center" element={<CenterProfile />} />
          <Route path="/entity/new" element={<EntityForm />} />
          <Route path="/entity" element={<EntityTable />} />
          <Route path="/entity/:id/edit" element={<EntityForm />} />
          <Route path="/exams/:id/edit" element={<ExamsForm />} />
          <Route path="/exams/new" element={<ExamsForm />} />
          <Route path="/exams" element={<ExamsTable />} />
          <Route path="/clients" element={<ClientsTable />} />
          <Route path="/clients/:id/edit" element={<ClientsForm />} />
          <Route path="/clients/new" element={<ClientsForm />} />
          <Route path="/drivers" element={<DriversTable />} />
          <Route path="/drivers/:id/edit" element={<DriversForm />} />
          <Route path="/licenses" element={<LicensesTable />} />
          <Route path="/licenses/:id/edit" element={<LicensesForm />} />
          <Route path="/licenses/new" element={<LicensesForm />} />
          <Route path="/infractions" element={<InfractionsTable />} />
          <Route path="/infractions/:id/edit" element={<InfractionsForm />} />
          <Route path="/infractions/new" element={<InfractionsForm />} />
          <Route path="/reports/" element={<Reports />} />
          <Route path="/reports/driver" element={<DriverReport />} />
          <Route path="/reports/entity" element={<EntityReport />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
