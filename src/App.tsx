import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { ThemeProvider } from "@aws-amplify/ui-react";
import theme from "./theme";

import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Tables from "./pages/tables";
import UsersTable from "./pages/tables/UsersTablePage";
import { Forms, Forms2 } from "./pages/forms";
import EditForm from "./pages/forms/EditForm";
import Login from "./pages/login";

const Centered: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    {children}
  </div>
);

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/login" element={<Centered><Login /></Centered>} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="forms" element={<Forms />} />
            <Route path="forms2" element={<Forms2 />} />
            <Route path="edit-form" element={<EditForm />} />
            <Route path="tables" element={<Tables />} />
            <Route path="users-table" element={<UsersTable />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

const NoMatch: React.FC = () => (
  <div>
    <h2>Nothing to see here!</h2>
  </div>
);

export default App;
