
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ListingsPage from "./components/pages/ListingsPage";
import SignInPage from "./components/pages/SignInPage";
import ListingDetailPage from "./components/pages/ListingDetailPage";
import RegisterPage from "./components/pages/RegisterPage";

import { AuthLoader } from "./components/auth/AuthLoader";

import ProfilePage from "./components/pages/ProfilePage";
import CreateListingPage from "./components/pages/CreateListingPage";
import MyPropertiesPage from "./components/pages/MyPropertiesPage";
import EditListingPage from "./components/pages/EditListingPage";

function App() {
  return (
    <BrowserRouter>
      <AuthLoader>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/listings" replace />} />
            <Route path="listings" element={<ListingsPage />} />
            <Route path="listing/:id" element={<ListingDetailPage />} />
            <Route path="map" element={<div>Map View Coming Soon!</div>} />
            <Route path='signin' element={<SignInPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="my-properties" element={<MyPropertiesPage />} />
            <Route path="create-listing" element={<CreateListingPage />} />
            <Route path="edit-listing/:id" element={<EditListingPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        </Routes>
      </AuthLoader>
    </BrowserRouter>
  );
}

export default App;
