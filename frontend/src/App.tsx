
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ListingsPage from "./components/pages/ListingsPage";
import SignInPage from "./components/pages/SignInPage";
import ListingDetailPage from "./components/pages/ListingDetailPage";
import sampleListings from "./data/apartments_data_example";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/listings" replace />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="listing/:id" element={<ListingDetailPage listings={sampleListings} />} />
          <Route path="map" element={<div>Map View Coming Soon!</div>} />
          <Route path='signin' element={<SignInPage/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
