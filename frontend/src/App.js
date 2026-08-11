import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

// BASE
import NavigationBar from "./BASE/NavigationBar";
import Home from "./BASE/Home";
import About from "./BASE/About";
import Footer from "./BASE/Footer";

// CONTACT
import Contact from "./Contact/Contact";

// CRUD
import Gallery from "./CRUD/Gallery";
import ReadOnePainting from "./CRUD/ReadOnePainting";
import CreatePainting from "./CRUD/CreatePainting";
import UpdatePainting from "./CRUD/UpdatePainting";

// ADMIN
import Login from "./Admin/Login";
import Dashboard from "./Admin/Dashboard";
import AddPainting from "./Admin/AddPainting";
import ManagePaintings from "./Admin/ManagePaintings";
import EditPainting from "./Admin/EditPainting";
import Messages from "./Admin/Messages";

function App() {
  return (
    <>
      <NavigationBar />

      <Routes>

        {/* PUBLIC PAGES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/gallery/:id"
          element={<ReadOnePainting />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />


        {/* OLD CRUD ROUTES */}

        <Route
          path="/create"
          element={<CreatePainting />}
        />

        <Route
          path="/update/:id"
          element={<UpdatePainting />}
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* OLD LOGIN URL */}

        <Route
          path="/admin/login"
          element={<Navigate to="/login" replace />}
        />


        {/* ADMIN */}

        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/admin/add"
          element={<AddPainting />}
        />

        <Route
          path="/admin/manage"
          element={<ManagePaintings />}
        />

        <Route
          path="/admin/edit/:id"
          element={<EditPainting />}
        />

        <Route
          path="/admin/messages"
          element={<Messages />}
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;