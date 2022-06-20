import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomButton from "./../../Components/CustomButton";
import { useDispatch } from "react-redux";
import { Register } from "../../Redux/RegisterSlice";
import { useNavigate } from "react-router-dom";
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

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const confirmRegister = async () => {
      const response = await dispatch(Register({ email, password, name }));
      if (!response.payload?.failed) {
        navigate("/login");
      } else {
      }
    };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        margin: "0",
        padding: "0",
        display: "flex",
        position: "fixed",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#FFF6F4",
          height: "100%",
          width: "30%",
          borderRight: "1px solid #58060A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
        }}
      >
        <Box sx={{ color: "#58060A", fontSize: "50px", marginBottom: "100px" }}>
          SDEquation Lab
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: "20px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ color: "#58060A", fontSize: "20px" }}>Nome:</Box>
            <CssTextField
              id="name"
              type="text"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ color: "#58060A", fontSize: "20px" }}>Email:</Box>
            <CssTextField
              id="email"
              type="text"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ color: "#58060A", fontSize: "20px" }}>Senha:</Box>
            <CssTextField
              id="pass"
              type="password"
              autoComplete="current-password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ color: "#58060A", fontSize: "20px" }}>
              Confirmar Senha:
            </Box>
            <CssTextField
              id="confPass"
              type="password"
              autoComplete="current-password"
              size="small"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around", gap:"30px" }}>
          <Box sx={{ minWidth: "50%", marginTop: "30px" }}>
            <CustomButton
              text="Voltar"
              onClick={() => {
                navigate("/login");
              }}
            />
          </Box>
        <Box sx={{ minWidth: "50%", marginTop: "30px" }}>
          <CustomButton
            text="Cadastrar"
            onClick={() => {
              if (!password.localeCompare(confirmPassword)) {
                console.log("senhas iguais");
                confirmRegister();
              } else {
                toast.error("As senhas devem ser idênticas");
              }
            }}
          />
        </Box>
        </Box>
      </Box>
      <Box sx={{ height: "100%", width: "100%", backgroundColor: "pink" }}>
        <img
          style={{ height: "100vh", width: "100vw" }}
          src="../images/unknown.png"
          alt="image"
        />
      </Box>
      <ToastContainer />;
    </Box>
  );
};

export default Cadastro;
