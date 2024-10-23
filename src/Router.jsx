import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
  EntityReport,
  IssuedLicensesReport,
  ExamsPerformedReport,
  RegisteredInfractionsReport,
  ExpiredLicensesReport,
  InfractionsByTypeReport,
  Login,
  WorkersForm,
  WorkersTable,
} from "./pages";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<App />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  element={<Dashboard />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute
                  element={<Notifications />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/center"
              element={
                <ProtectedRoute
                  element={<CenterProfile />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/entity/new"
              element={
                <ProtectedRoute
                  element={<EntityForm />}
                  allowedRoles={["MANAGER"]}
                />
              }
            />
            <Route
              path="/entity"
              element={
                <ProtectedRoute
                  element={<EntityTable />}
                  allowedRoles={["MANAGER"]}
                />
              }
            />
            <Route
              path="/entity/:id/edit"
              element={
                <ProtectedRoute
                  element={<EntityForm />}
                  allowedRoles={["MANAGER"]}
                />
              }
            />
            <Route
              path="/exams/:id/edit"
              element={
                <ProtectedRoute
                  element={<ExamsForm />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/exams/new"
              element={
                <ProtectedRoute
                  element={<ExamsForm />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/exams"
              element={
                <ProtectedRoute
                  element={<ExamsTable />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/clients"
              element={
                <ProtectedRoute
                  element={<ClientsTable />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/clients/:id/edit"
              element={
                <ProtectedRoute
                  element={<ClientsForm />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/clients/new"
              element={
                <ProtectedRoute
                  element={<ClientsForm />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/drivers"
              element={
                <ProtectedRoute
                  element={<DriversTable />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/drivers/:id/edit"
              element={
                <ProtectedRoute
                  element={<DriversForm />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/licenses"
              element={
                <ProtectedRoute
                  element={<LicensesTable />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/licenses/:id/edit"
              element={
                <ProtectedRoute
                  element={<LicensesForm />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/licenses/new"
              element={
                <ProtectedRoute
                  element={<LicensesForm />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/infractions"
              element={
                <ProtectedRoute
                  element={<InfractionsTable />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/infractions/:id/edit"
              element={
                <ProtectedRoute
                  element={<InfractionsForm />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/infractions/new"
              element={
                <ProtectedRoute
                  element={<InfractionsForm />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/reports/"
              element={
                <ProtectedRoute
                  element={<Reports />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/reports/driver"
              element={
                <ProtectedRoute
                  element={<DriverReport />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/reports/entity"
              element={
                <ProtectedRoute
                  element={<EntityReport />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/reports/issuedLicenses"
              element={
                <ProtectedRoute
                  element={<IssuedLicensesReport />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/reports/examsPerformed"
              element={
                <ProtectedRoute
                  element={<ExamsPerformedReport />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/reports/registeredInfractions"
              element={
                <ProtectedRoute
                  element={<RegisteredInfractionsReport />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/reports/expiredLicenses"
              element={
                <ProtectedRoute
                  element={<ExpiredLicensesReport />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/reports/infractionsByType"
              element={
                <ProtectedRoute
                  element={<InfractionsByTypeReport />}
                  allowedRoles={["MANAGER", "COMERCIAL"]}
                />
              }
            />
            <Route
              path="/workers"
              element={
                <ProtectedRoute
                  element={<WorkersTable />}
                  allowedRoles={["MANAGER"]}
                />
              }
            />
            <Route
              path="/workers/new"
              element={
                <ProtectedRoute
                  element={<WorkersForm />}
                  allowedRoles={["MANAGER"]}
                />
              }
            />
            <Route
              path="/workers/:id/edit"
              element={
                <ProtectedRoute
                  element={<WorkersForm />}
                  allowedRoles={["MANAGER"]}
                />
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
