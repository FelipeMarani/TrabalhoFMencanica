import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Stack, Box, Typography } from "@mui/material";
import Login from "./Login";
import Home from "./Home";
import "./assets/styles.css";
import CadastroAlinhamentoFuncao from "./Cadastros/CadastroAlinhamentoFuncao";
import CadastroChamado from "./Cadastros/CadastroChamado";
import CadastroCliente from "./Cadastros/CadastroCliente";
import CadastroFuncao from "./Cadastros/CadastroFuncao";
import CadastroFuncionario from "./Cadastros/CadastroFuncionario";
import CadastroStatusChamado from "./Cadastros/CadastroStatusChamado";
import CadastroTipoChamado from "./Cadastros/CadastroTipoChamado";
import CadastroTipoVeiculo from "./Cadastros/CadastroTipoVeiculo";
import ListaAlinhamentoFuncao from "./Listas/ListaAlinhamentoFuncao";
import ListaChamado from "./Listas/ListaChamado";
import ListaCliente from "./Listas/ListaCliente";
import ListaFuncao from "./Listas/ListaFuncao";
import ListaFuncionario from "./Listas/ListaFuncionario";
import ListaStatusChamado from "./Listas/ListaStatusChamado";
import ListaTipoChamado from "./Listas/ListaTipoChamado";
import ListaTipoVeiculo from "./Listas/ListaTipoVeiculo";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [permissoes, setPermissoes] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userCargo, setUserCargo] = useState("");
  const [exibeCadastro, setExibecadastros] = useState(false);
  const [exibeListas, setExibeListas] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Home");


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

  // Atualiza flags locais baseado na lista de permissões vinda do backend
  useEffect(() => {
    const podeCadastro = permissoes.includes("exibeCadastro");
    const podeListas = permissoes.some((p) => p === "exibeListas" || p === "exibeCurso");
    setExibecadastros(podeCadastro);
    setExibeListas(podeListas);
    // Define cargo a partir das permissões
    if (permissoes && permissoes.length) {
      const cargoPreferencial = permissoes.includes("Gerencia") ? "Gerencia" : permissoes[0];
      setUserCargo(cargoPreferencial);
    } else {
      setUserCargo("");
    }
  }, [permissoes]);

  const buscarPermissoesPorEmail = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3030/usuario_permissao/usuario/${email}`, {
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

  const handleLogin = (success, useremail = null, username = null) => {
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
      if (username) setUserName(username);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUserEmail("");
      setUserName("");
      setUserCargo("");
      localStorage.removeItem("token");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setUserName("");
    setUserCargo("");
    setPermissoes([]);
    localStorage.removeItem("token");
    setSelectedPage("Home");
  };

  // Mapeia itens do Drawer para componentes de página
  const pageMap = useMemo(
    () => ({
      "Alinhamento de Função": CadastroAlinhamentoFuncao,
      "Chamado": CadastroChamado,
      "Cliente": CadastroCliente,
      "Função": CadastroFuncao,
      "Funcionário": CadastroFuncionario,
      "Status para Chamado": CadastroStatusChamado,
      "Tipos de Chamados": CadastroTipoChamado,
      "Tipos de Veículos": CadastroTipoVeiculo,
      "Funções Alinhadas": ListaAlinhamentoFuncao,
      "Lista de Chamados": ListaChamado,
      "Lista de Clientes": ListaCliente,
      "Lista de Funções": ListaFuncao,
      "Lista de Funcionários": ListaFuncionario,
      "Lista de Andamento de Chamados": ListaStatusChamado,
      "Listar tipos de Chamado": ListaTipoChamado,
      "Listar Tipos de Veiculos": ListaTipoVeiculo,
    }),
    [],
  );

  // Ouvinte global para clicks no Drawer (sem alterar Home.jsx)
  useEffect(() => {
    const handleMenuClick = (event) => {
      const btn = event.target.closest(".MuiListItemButton-root");
      if (!btn) return;
      const drawer = btn.closest(".MuiDrawer-paper");
      if (!drawer) return;
      const label = btn.innerText.trim();
      if (pageMap[label]) {
        setSelectedPage(label);
      }
    };

    document.addEventListener("click", handleMenuClick);
    return () => document.removeEventListener("click", handleMenuClick);
  }, [pageMap]);

  // Mostra cargo no rodapé do Drawer sem alterar Home.jsx
  useEffect(() => {
    const footerClass = "drawer-role-footer";
    const injectFooter = () => {
      const drawer = document.querySelector(".MuiDrawer-paper");
      if (!drawer) return;
      let footer = drawer.querySelector(`.${footerClass}`);
      if (!footer) {
        footer = document.createElement("div");
        footer.className = footerClass;
        footer.style.padding = "12px 16px";
        footer.style.fontSize = "0.9rem";
        footer.style.color = "#4b5563";
        footer.style.borderTop = "1px solid #e5e7eb";
        footer.style.background = "#f9fafb";
        drawer.appendChild(footer);
      }
      footer.textContent = `Cargo: ${userCargo || "N/A"}`;
    };

    const timer = setTimeout(injectFooter, 80);
    return () => clearTimeout(timer);
  }, [userCargo]);

  const CurrentPage = pageMap[selectedPage];

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
    <Box>
      <Home userName={userName} userCargo={userCargo} onLogout={handleLogout} />
      <Box className="container" sx={{ py: 3 }}>
        {selectedPage === "Home" || !CurrentPage ? (
          <Stack spacing={2}>
            <Typography variant="h5">Home</Typography>
            <Typography color="text.secondary">Selecione uma opção no menu para navegar.</Typography>
          </Stack>
        ) : (
          <CurrentPage />
        )}
      </Box>
    </Box>
  );
}
