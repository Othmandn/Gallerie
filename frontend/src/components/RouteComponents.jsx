import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import NavBar from "./NavBar";
import NavBarUser from "./NavBarUser";
import Home from "../pages/Home";
import AdminHome from "../pages/AdminHome";
import UserHome from "../pages/UserHome";
import AccountSettings from "../pages/AccountSettings";
import About from "../pages/About";
import Gallery from "../pages/Gallery";
import Artwork from "../pages/Artwork";
import Artist from "../pages/Artist";
import ArtworksAdministration from "../pages/ArtworksAdministration";
import UsersAdministration from "../pages/UsersAdministration";
import ArtistAdministration from "../pages/ArtistAdministration";
import UnauthorizedPage from "../pages/Unauthorized";
import UserFavorite from "../pages/UserFavorite";

export default function RoutesComponent() {
  const { userRole } = useContext(AuthContext);
  return (
    <div className="App">
      {userRole === 0 || userRole === 1 ? <NavBarUser /> : <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={userRole === 0 ? <AdminHome /> : <UnauthorizedPage />}
        />
        <Route
          path="/admin/users"
          element={
            userRole === 0 ? <UsersAdministration /> : <UnauthorizedPage />
          }
        />
        <Route
          path="/admin/artworks"
          element={
            userRole === 0 ? <ArtworksAdministration /> : <UnauthorizedPage />
          }
        />
        <Route
          path="/admin/artists"
          element={
            userRole === 0 ? <ArtistAdministration /> : <UnauthorizedPage />
          }
        />

        <Route
          path="/user"
          element={userRole === 1 ? <UserHome /> : <UnauthorizedPage />}
        />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:artworkId" element={<Artwork />} />
        <Route path="/artist/:artistId" element={<Artist />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/settings"
          element={
            userRole === 1 || userRole === 0 ? (
              <AccountSettings />
            ) : (
              <UnauthorizedPage />
            )
          }
        />
        <Route
          path="/user/:userId/favorite"
          element={userRole === 1 ? <UserFavorite /> : <UnauthorizedPage />}
        />
      </Routes>
    </div>
  );
}
