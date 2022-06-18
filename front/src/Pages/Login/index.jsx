import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomButton from "./../../Components/CustomButton";
import {useDispatch} from "react-redux";
import { login } from "../../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";

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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authLogin = async () => {
    const response = await dispatch(login({ email, password }));
    if (!response.payload.failed) {
      navigate("");
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
            <Box sx={{ color: "#58060A", fontSize: "20px" }}>Email:</Box>
            <CssTextField
              id="custom-css-outlined-input"
              type="text"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ color: "#58060A", fontSize: "20px" }}>Senha:</Box>
            <CssTextField
              id="outlined-password-input"
              type="password"
              autoComplete="current-password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </Box>
        <Box sx={{ width: "30%", marginTop: "30px" }}>
          <CustomButton text="Entrar" onClick={authLogin} />
        </Box>
      </Box>
      <Box sx={{ height: "100%", width: "100%", backgroundColor: "pink" }}>
        <img style={{ height: "100vh", width: "100vw"}}
          // className={style.image}
          src="../images/unknown.png"
          alt="image"
        />
      </Box>
    </Box>
  );
};

export default Login;
