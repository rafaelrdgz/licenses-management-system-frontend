import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Importar jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar el token desde Local Storage
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token); // Decodificar el token para obtener los datos del usuario
      setUser(decodedUser);
    }
    setLoading(false); // Termina la carga
  }, []);

  const login = (token) => {
    const decodedUser = jwtDecode(token); // Decodificar el token al iniciar sesión
    setUser(decodedUser);
    localStorage.setItem("token", token); // Solo guardar el token
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Eliminar el token
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Obtener el token almacenado en localStorage
export const getToken = () => localStorage.getItem("token");
