import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import CadastroVeiculo from "./Cadastros/CadastroVeiculo";
import CadastroEndereco from "./Cadastros/CadastroEndereco";
import ListaAlinhamentoFuncao from "./Listas/ListaAlinhamentoFuncao";
import ListaChamado from "./Listas/ListaChamado";
import ListaCliente from "./Listas/ListaCliente";
import ListaFuncao from "./Listas/ListaFuncao";
import ListaFuncionario from "./Listas/ListaFuncionario";
import ListaStatusChamado from "./Listas/ListaStatusChamado";
import ListaTipoChamado from "./Listas/ListaTipoChamado";
import ListaTipoVeiculo from "./Listas/ListaTipoVeiculo";
import ListaVeiculo from "./Listas/ListaVeiculo";
import ListaEndereco from "./Listas/ListaEndereco";
import EditarCliente from "./Editar/EditarCliente";
import EditarFuncionario from "./Editar/EditarFuncionario";
import EditarFuncao from "./Editar/EditarFuncao";
import EditarEndereco from "./Editar/EditarEndereco";
import EditarVeiculo from "./Editar/EditarVeiculo";
import EditarAlinhamentoFuncao from "./Editar/EditarAlinhamentoFuncao";
import EditarChamado from "./Editar/EditarChamado";
import EditarStatusChamado from "./Editar/EditarStatusChamado";
import EditarTipoChamado from "./Editar/EditarTipoChamado";
import EditarTipoVeiculo from "./Editar/EditarTipoVeiculo";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [permissoes, setPermissoes] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userCargo, setUserCargo] = useState("");
  const [userFuncao, setUserFuncao] = useState("");
  const [exibeCadastro, setExibecadastros] = useState(false);
  const [exibeListas, setExibeListas] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Home");

  // Configurar interceptor do axios para lidar com erros de autenticação
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Se receber 401 (não autorizado), limpar cache e deslogar
        if (error.response && error.response.status === 401) {
          console.log("Sessão expirada ou inválida, limpando cache...");
          localStorage.clear();
          sessionStorage.clear();
          setIsLoggedIn(false);
          setUserEmail("");
          setUserName("");
          setUserCargo("");
          setUserFuncao("");
          setPermissoes([]);
        }
        return Promise.reject(error);
      }
    );

    // Cleanup: remover interceptor quando componente desmontar
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);
  const allCadastros = [
    "Alinhamento de Função",
    "Chamado",
    "Cliente",
    "Função",
    "Funcionário",
    "Status para Chamado",
    "Tipos de Chamados",
    "Tipos de Veículos",
    "Veículo",
    "Endereço",
  ];

  const allListas = [
    "Funções Alinhadas",
    "Lista de Chamados",
    "Lista de Clientes",
    "Lista de Funções",
    "Lista de Funcionários",
    "Lista de Andamento de Chamados",
    "Listar tipos de Chamado",
    "Listar Tipos de Veiculos",
    "Lista de Veículos",
    "Lista de Endereços",
  ];


  useEffect(() => {
    // Verifica se há token no localStorage ao carregar
    const token = localStorage.getItem("token");
    if (token) {
      // Tenta decodificar o token para obter o email do usuário
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        // Verifica se o token está expirado
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          console.log("Token expirado, limpando cache...");
          localStorage.clear();
          sessionStorage.clear();
          return;
        }

        if (payload.username) {
          setUserEmail(payload.username);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        // Token inválido ou corrompido, limpar tudo
        localStorage.clear();
        sessionStorage.clear();
      }
    }
  }, []);

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

      // Buscar dados do funcionário para obter a função
      const funcionarioResponse = await axios.get(`http://localhost:3030/funcionario/pesquisa?termoBusca=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const funcionarios = Array.isArray(funcionarioResponse.data) ? funcionarioResponse.data : funcionarioResponse.data.funcionarios || [];
      if (funcionarios && funcionarios.length > 0) {
        const funcionario = funcionarios[0];
        // Buscar o alinhamento de função
        const alinhamentoResponse = await axios.get(`http://localhost:3030/alinhamento_funcao`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const alinhamentos = Array.isArray(alinhamentoResponse.data) ? alinhamentoResponse.data : alinhamentoResponse.data.alFuncoes || [];
        const alinhamento = alinhamentos.find(a => a.id_funcionario === funcionario.id);
        if (alinhamento && alinhamento.Funcao) {
          setUserFuncao(alinhamento.Funcao.nome);
        }
      }
    } catch (error) {
      console.log(error);
      setPermissoes([]);
    }
  };

  useEffect(() => {
    // Busca permissões quando o usuário estiver logado e tiver email
    if (isLoggedIn && userEmail) {
      buscarPermissoesPorEmail(userEmail);
    }
  }, [isLoggedIn, userEmail]);

  // Atualiza flags locais baseado na lista de permissões vinda do backend
  useEffect(() => {
    const nomesPermissoes = (permissoes || [])
      .map((p) => {
        if (p && p.Permissao && typeof p.Permissao.nome === "string") return p.Permissao.nome;
        if (typeof p === "string") return p;
        return "";
      })
      .filter(Boolean);
    const podeCadastro = nomesPermissoes.includes("exibeCadastro");
    const podeListas = nomesPermissoes.some((p) => p === "exibeListas" || p === "exibeCurso");
    setExibecadastros(podeCadastro);
    setExibeListas(podeListas);
    // Define cargo a partir das permissões
    if (nomesPermissoes && nomesPermissoes.length) {
      const cargoPreferencial = nomesPermissoes.includes("Gerencia") ? "Gerencia" : nomesPermissoes[0];
      setUserCargo(cargoPreferencial);
    } else {
      setUserCargo("");
    }
  }, [permissoes]);

  const handleLogin = (success, useremail = null, username = null) => {
    if (success) {
      // Limpar dados do usuário anterior antes de logar o novo
      setUserEmail("");
      setUserName("");
      setUserCargo("");
      setUserFuncao("");
      setPermissoes([]);

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
      setUserFuncao("");
      setPermissoes([]);
      localStorage.clear();
      sessionStorage.clear();
    }
  };

  const handleLogout = () => {
    // Limpar todos os estados
    setIsLoggedIn(false);
    setUserEmail("");
    setUserName("");
    setUserCargo("");
    setUserFuncao("");
    setPermissoes([]);
    setSelectedPage("Home");

    // Limpar completamente localStorage
    localStorage.clear();

    // Limpar completamente sessionStorage
    sessionStorage.clear();

    // Forçar reload da página para limpar cache do React
    window.location.href = "/";
  };

  const roleSource = [userFuncao, userCargo].find((v) => typeof v === "string" && v.trim());
  const role = (roleSource || "").toLowerCase();

  const allowedByRole = () => {
    if (role.includes("ger")) {
      return { cad: allCadastros, listas: allListas };
    }

    if (role.includes("atend")) {
      return {
        cad: ["Cliente", "Veículo", "Chamado", "Tipos de Veículos"],
        listas: [
          "Lista de Chamados",
          "Lista de Clientes",
          "Lista de Andamento de Chamados",
          "Lista de Veículos",
          "Listar Tipos de Veiculos",
        ],
      };
    }

    if (role.includes("rh")) {
      return {
        cad: ["Cliente", "Funcionário", "Alinhamento de Função", "Função", "Endereço"],
        listas: [
          "Funções Alinhadas",
          "Lista de Clientes",
          "Lista de Funções",
          "Lista de Funcionários",
          "Lista de Endereços",
        ],
      };
    }

    if (role.includes("mec") || role.includes("estag")) {
      return {
        cad: ["Chamado", "Veículo", "Tipos de Veículos"],
        listas: [
          "Lista de Veículos",
          "Lista de Chamados",
          "Lista de Andamento de Chamados",
        ],
      };
    }

    // padrão: tudo liberado
    return { cad: allCadastros, listas: allListas };
  };

  const { cad: allowedCadastros, listas: allowedListas } = allowedByRole();

  useEffect(() => {
    if (selectedPage !== "Home" && !allowedCadastros.includes(selectedPage) && !allowedListas.includes(selectedPage)) {
      setSelectedPage("Home");
    }
  }, [allowedCadastros, allowedListas, selectedPage]);

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
      "Veículo": CadastroVeiculo,
      "Endereço": CadastroEndereco,
      "Funções Alinhadas": ListaAlinhamentoFuncao,
      "Lista de Chamados": ListaChamado,
      "Lista de Clientes": ListaCliente,
      "Lista de Funções": ListaFuncao,
      "Lista de Funcionários": ListaFuncionario,
      "Lista de Andamento de Chamados": ListaStatusChamado,
      "Listar tipos de Chamado": ListaTipoChamado,
      "Listar Tipos de Veiculos": ListaTipoVeiculo,
      "Lista de Veículos": ListaVeiculo,
      "Lista de Endereços": ListaEndereco,
    }),
    [],
  );

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
      <Home
        userName={userName}
        userCargo={userCargo}
        userFuncao={userFuncao}
        onLogout={handleLogout}
        cadastrosItens={allowedCadastros}
        listasItens={allowedListas}
        onSelectPage={(label) => {
          if (pageMap[label]) setSelectedPage(label);
        }}
      />
      <Box className="container" sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={selectedPage !== "Home" && CurrentPage ? <CurrentPage /> : null} />

          {/* Rotas de Listas */}
          <Route path="/lista-clientes" element={<ListaCliente />} />
          <Route path="/lista-funcionarios" element={<ListaFuncionario />} />
          <Route path="/lista-funcoes" element={<ListaFuncao />} />
          <Route path="/lista-enderecos" element={<ListaEndereco />} />
          <Route path="/lista-veiculos" element={<ListaVeiculo />} />
          <Route path="/lista-alinhamento-funcao" element={<ListaAlinhamentoFuncao />} />
          <Route path="/lista-chamados" element={<ListaChamado />} />
          <Route path="/lista-status-chamado" element={<ListaStatusChamado />} />
          <Route path="/lista-tipo-chamado" element={<ListaTipoChamado />} />
          <Route path="/lista-tipo-veiculo" element={<ListaTipoVeiculo />} />

          {/* Rotas de Cadastros */}
          <Route path="/cadastro-cliente" element={<CadastroCliente />} />
          <Route path="/cadastro-funcionario" element={<CadastroFuncionario />} />
          <Route path="/cadastro-funcao" element={<CadastroFuncao />} />
          <Route path="/cadastro-endereco" element={<CadastroEndereco />} />
          <Route path="/cadastro-veiculo" element={<CadastroVeiculo />} />
          <Route path="/cadastro-alinhamento-funcao" element={<CadastroAlinhamentoFuncao />} />
          <Route path="/cadastro-chamado" element={<CadastroChamado />} />
          <Route path="/cadastro-status-chamado" element={<CadastroStatusChamado />} />
          <Route path="/cadastro-tipo-chamado" element={<CadastroTipoChamado />} />
          <Route path="/cadastro-tipo-veiculo" element={<CadastroTipoVeiculo />} />

          {/* Rotas de Edição */}
          <Route path="/editar-cliente/:id" element={<EditarCliente />} />
          <Route path="/editar-funcionario/:id" element={<EditarFuncionario />} />
          <Route path="/editar-funcao/:id" element={<EditarFuncao />} />
          <Route path="/editar-endereco/:id" element={<EditarEndereco />} />
          <Route path="/editar-veiculo/:id" element={<EditarVeiculo />} />
          <Route path="/editar-alinhamento-funcao/:id" element={<EditarAlinhamentoFuncao />} />
          <Route path="/editar-chamado/:id" element={<EditarChamado />} />
          <Route path="/editar-status-chamado/:id" element={<EditarStatusChamado />} />
          <Route path="/editar-tipo-chamado/:id" element={<EditarTipoChamado />} />
          <Route path="/editar-tipo-veiculo/:id" element={<EditarTipoVeiculo />} />
        </Routes>
      </Box>
    </Box>
  );
}
