import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';
import Login from './components/pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/pages/Register';

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Container customClass="min-height">
                <Home />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Container customClass="min-height">
                <Projects />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/company"
          element={
            <ProtectedRoute>
              <Container customClass="min-height">
                <Company />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Container customClass="min-height">
                <Contact />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/newproject"
          element={
            <ProtectedRoute>
              <Container customClass="min-height">
                <NewProject />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:id"
          element={
            <ProtectedRoute>
              <Container customClass="min-height">
                <Project />
              </Container>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
