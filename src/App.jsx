import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Partners from "./pages/Partners";
import PartnerDetails from "./pages/PartnerDetails";
import Documents from "./pages/Documents";
import Scrutiny from "./pages/Scrutiny";
import Compliance from "./pages/Compliance";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard />}
      />

      <Route
        path="/partners"
        element={<Partners />}
      />

      <Route
        path="/partners/:partnerId"
        element={<PartnerDetails />}
      />

      <Route
        path="/documents"
        element={<Documents />}
      />

      <Route
        path="/scrutiny"
        element={<Scrutiny />}
      />

      <Route
        path="/compliance"
        element={<Compliance />}
      />

      <Route
        path="/alerts"
        element={<Alerts />}
      />

      <Route
        path="/reports"
        element={<Reports />}
      />
    </Routes>
  );
}

export default App;