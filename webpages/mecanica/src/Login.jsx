import React from "react";
import axios from "axios";

import { Alert, Button, Snackbar, TextField, Stack } from "@mui/material";

export default function Login({ handleLogin }) {
  const [useremail, setUseremail] = React.useState("");
  const [passwd, setPasswd] = React.useState("");

  const [openMessage, setOpenMessage] = React.useState(false);
  const [messageText, setMessageText] = React.useState("");
  const [messageSeverity, setMessageSeverity] = React.useState("success");

    async function enviaLogin(event) {
      event.preventDefault();
      try {
        const response = await axios.post("http://localhost:3030/login", {
          email: useremail,
          senha: passwd,
        });

        if (response.status >= 200 && response.status <= 300) {
          localStorage.setItem("token", response.data.token);
          handleLogin(true, useremail);
          setOpenMessage(true);
          setMessageText("Login realizado com sucesso");
          setMessageSeverity("success");
        } else {
          setOpenMessage(true);
          setMessageText("Falha na autenticação");
          setMessageSeverity("error");
        }
      } catch (error) {
        console.error("Falha na autenticação", error);
        setOpenMessage(true);
        setMessageText("Falha na autenticação");
        setMessageSeverity("error");
      }
    }

    function cancelaLogin() {
      if (useremail !== "" || passwd !== "") {
        setUseremail("");
        setPasswd("");
      }
      setOpenMessage(true);
      setMessageText("Login cancelado");
      setMessageSeverity("warning");
    }

    function handleCloseMessage(_, reason) {
      if (reason === "clickaway") return;
      setOpenMessage(false);
    }

    return (
      <Stack spacing={2} sx={{ maxWidth: 360, mx: "auto", mt: 8 }}>
        <h1>Acesse o sistema</h1>
        <form onSubmit={enviaLogin}>
          <Stack spacing={2}>
            <TextField
              label="E-mail"
              type="email"
              value={useremail}
              onChange={(e) => setUseremail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Senha"
              type="password"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
              required
              fullWidth
            />
            <Stack direction="row" spacing={1}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
              <Button type="button" variant="outlined" fullWidth onClick={cancelaLogin}>
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </form>

        <Snackbar open={openMessage} autoHideDuration={4000} onClose={handleCloseMessage}>
          <Alert severity={messageSeverity} onClose={handleCloseMessage} sx={{ width: "100%" }}>
            {messageText}
          </Alert>
        </Snackbar>
      </Stack>
    );
}
