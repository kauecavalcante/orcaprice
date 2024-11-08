// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return unsubscribe; // Limpa o listener ao desmontar o componente
  }, []);

  if (loading) return <p>Carregando...</p>;

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
