import React, { useState, useEffect } from "react";
import Header from "./../../Components/Header";
import { styled } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";
import CustomButton from "./../../Components/CustomButton";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#58060A",
  },
  "&.MuiTextField-root": {
    backgroundColor: "#F9F9F9",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#58060A",
    // backgroundColor: "#F9F9F9",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#58060A",
      // backgroundColor: "#F9F9F9",
    },
    "&:hover fieldset": {
      borderColor: "#58060A",
      // backgroundColor: "#F9F9F9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#58060A",
      // backgroundColor: "#F9F9F9",
    },
  },
});

const sendData = async (data, setCount, token) => {
  const response = await fetch("http://localhost:3003/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
    body: JSON.stringify({ ...data }),
  });

  if (!response.ok) {
    toast.error("Erro ao enviar informações");
  }else{
    toast.success("Dados atualizados com sucesso!")
    setCount(count => count + 1);  
  }
};

const Perfil = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [count, setCount] = useState(1);

  const getEmail = useSelector((state) => state.auth.email);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:3003/summary/${getEmail}`);
      const data = await response.json();
      const userName = data.summaryInfo.name;
      console.log(userName);
      setEmail(getEmail);
      setName(userName);
    };
    getData();
  }, [count]);
  return (
    <Box sx={{ height: "100%", width: "100%", backgroundColor: "#FFF9F8" }}>
      <Header />
      <Box
        sx={{
          height: "85%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* <Box sx={{ color: "#58060A", fontSize: "20px" }}>Nome:</Box> */}
          <CssTextField
            id="name"
            type="text"
            size="small"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* <Box sx={{ color: "#58060A", fontSize: "20px" }}>Nova senha:</Box> */}
          <CssTextField
            id="pass"
            type="password"
            autoComplete="current-password"
            size="small"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* <Box sx={{ color: "#58060A", fontSize: "20px" }}>
            Confirmar Senha:
          </Box> */}
          <CssTextField
            id="confPass"
            type="password"
            autoComplete="current-password"
            size="small"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ width: "10%", marginTop: "30px" }}>
          <CustomButton
            text="Salvar"
            onClick={() => {
              if (!password.localeCompare(confirmPassword)) {
                console.log("senhas iguais");
              } else {
                toast.error("As senhas devem ser idênticas");
              }
              if (
                name.trim === "" ||
                email.trim === "" ||
                password.trim === ""
              ) {
                toast.error("Preencha os campos!");
              } else {
                sendData({ name, email, password }, setCount, token);                
              }
            }}
          />
        </Box>
      </Box>
      <ToastContainer />;
    </Box>
  );
};

export default Perfil;
