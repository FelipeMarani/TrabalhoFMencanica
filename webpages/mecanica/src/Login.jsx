import React from "react";
import axios from "axios";

import { Alert, Box, Button, Snackbar, Stack, TextField } from "@mui/material";

export default function Login({ handleLogin }) {
    const [useremail, setUseremail] = React.useState("");
    const [passwd, setPasswd] = React.useState("");

    const [openMenssage, setOpenMessage] = React.useState(false);
    const [menssageText, setMenssageText] = React.useState("");
    const [menssageSeverity, setMenssageSeverity] = React.useState("success");

    async function enviaLogin(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5173/Login", {
                useremail: useremail,
                passwd: passwd,
            });
            if (response.status >= 200 && response.status <= 300) {
                //Salva o token JWT na sessão
                localStorage.setItem("token", response.data.token);
                //Seta o estado de Login caso tudo certo com a verificação, passando o useremail
                handleLogin(true, useremail);
            }
            else {
                //No caso da falha
                console.error("Falha na autenticação");
                setOpenMessage(true);
                setMenssageText("falha na autenticação!");
                setMenssageSeverity("error");
            }
        } catch (error) {
            console.error("Falha na autenticação:", error);
            setOpenMessage(true);
            setMenssageText("Falha na autenticação");
            setMenssageSeverity("error");
        }
    }

    function cancelaLogin() {
        if (useremail !== "" || passwd !== "") {
            setUseremail("");
            setPasswd("");
        }
        setOpenMessage(true);
        setMenssageText("Login cancelado!");
        setMenssageSeverity("warning");
    }

    function handleCloseMessage(_, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpenMessage(false);
    }


    return (
        <Box style={{ maxWidth: "300px" }}>
            <Stack spacing={2}>
                <TextField required id="useremail-input"
                    label="Email: "
                    size="small"
                    value={useremail}
                    onChange={(event) => {
                        setUseremail(event.target.value);
                    }} />
                <TextField
                    required
                    id="passwd-input"
                    label="Password: "
                    type="password"
                    size="small"
                    value={passwd}
                    onChange={(event) => {
                        setPasswd(event.target.value);
                    }}
                />
                <Stack direction={"row"} spacing={3}>
                    <Button
                    className="enviar-login"
                        variant="contained"
                        style={{
                            maxWidth: "100px",
                            maxHeight: "100px",
                        }}
                        onClick={enviaLogin}>
                        Enviar
                    </Button>
                    <Button
                        variant="outlined"
                        style={{
                            maxWidth: "100px",
                            minWidth: "100px",
                        }}
                        color="error"
                        onClick={cancelaLogin}
                    >
                        Cancelar
                    </Button>
                </Stack>
                <Snackbar
                    open={openMenssage}
                    autoHideDuration={6000}
                    onClose={handleCloseMessage}
                >
                    <Alert
                        severity={menssageSeverity}
                        onClose={handleCloseMessage}
                    >
                        {menssageText}
                    </Alert>
                </Snackbar>

            </Stack>
        </Box>

    )
}
