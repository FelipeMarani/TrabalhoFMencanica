import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Stack, Box, Typography, Chip } from "@mui/material";
import Login from "./Login";
import "./assets/styles.css";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [permissoes, setPermissoes] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Verifica se há token no localStorage ao carregar
    const token = localStorage.getItem("token");
    if (token) {
      // Tenta decodificar o token para obter o email do usuário
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.username) {
          setUserEmail(payload.username);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    // Busca permissões quando o usuário estiver logado e tiver email
    if (isLoggedIn && userEmail) {
      buscarPermissoesPorEmail(userEmail);
    }
  }, [isLoggedIn, userEmail]);


  const buscarPermissoesPorEmail = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3002/usuario_permissao/usuario/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.permissoes);
      setPermissoes(response.data.permissoes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = (success, useremail = null) => {
    if (success) {
      // Se o username foi passado, usa ele, senão tenta decodificar do token
      if (useremail) {
        setUserEmail(useremail);
      } else {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload.username) {
              setUserEmail(payload.username);
            }
          }
        } catch (error) {
          console.error("Erro ao decodificar token:", error);
        }
      }
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUserEmail("");
      localStorage.removeItem("token");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setPermissoes([]);
    localStorage.removeItem("token");
  };

  	// Se não estiver logado, mostra a tela de login
	if (!isLoggedIn) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<Stack spacing={2} alignItems="center" className="Login">
					<Typography variant="h4" component="h1">
						Login
					</Typography>
					<Login handleLogin={handleLogin} />
				</Stack>
			</Box>
		);
	}

  return (
    <>
    </>
  );
}
