import './App.css';
import Contact from './Contact/Contact';
import CreateIPainting from './CRUD/CreatePainting';
import Gallery from './CRUD/Gallery';
import NavigationBar from './BASE/NavigationBar';
import { Navigate, Routes, Route } from "react-router-dom"
import ReadOnePainting from "./CRUD/ReadOnePainting";
import UpdatePainting from './CRUD/UpdatePainting';
import Footer from './BASE/Footer';
import Home from './BASE/Home';
import About from './BASE/About';
// Importon Komponeteve AUTH
import Login from "./Admin/Login";
import { UserContextProvider } from "./Admin/UserContext";
function App() {
  return (
    <div>
      {/* “Njohja ” context global te user-it. */}
      <UserContextProvider>

        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/" element={<About />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/allItems/" element={<Navigate to="/gallery" replace />} />
          <Route path="/createItem/" element={<CreateIPainting />} />
          <Route path="/readOne/:id" element={<ReadOnePainting />} />
          <Route path="/updateOne/:id" element={<UpdatePainting />} />
    
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </div>
  );
}

export default App;
