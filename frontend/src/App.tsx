
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ListingsPage from "./components/pages/ListingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wraps all routes */}
        <Route path="/" element={<Layout />}>
          {/* Default route redirects to /listings */}
          <Route index element={<Navigate to="/listings" replace />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="map" element={<div>Map View Coming Soon!</div>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
