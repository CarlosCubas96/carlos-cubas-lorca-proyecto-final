import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Función auxiliar para analizar el JWT
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = ({ logOut }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        const decodedJwt = parseJwt(user.accessToken);

        if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
          logOut();
          navigate('/login'); // Redirigir a la página de inicio de sesión
        }
      }
    };

    // Llamar a la función inicialmente
    checkTokenExpiry();

    // Configurar un intervalo para comprobar la caducidad del token periódicamente
    const intervalId = setInterval(checkTokenExpiry, 60000); // Comprobar cada 60 segundos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [logOut, navigate]);

  return null; // No es necesario devolver un div, el componente es puramente funcional
};

export default AuthVerify;
