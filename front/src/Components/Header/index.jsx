import React, { useNa } from "react";
import { Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/AuthSlice";

const Header = ({ text }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        width: "100%",
        height: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFF6F4",
        borderBottom: "1px solid #58060A",
        boxShadow: "12px 12px 12px rgba(162, 162, 162, 0.25);",
      }}
    >
      <Box sx={{ color: "#58060A", fontSize: "45px", marginLeft: "50px" }}>
        SDEquation Lab
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "40%",
          justifyContent: "space-around",
          marginRight: "50px",
        }}
      >
        <Box
          onClick={() => navigate("/perfil")}
          sx={{ color: "#58060A", fontSize: "24px", cursor: "pointer" }}
        >
          Perfil
        </Box>
        <Box
          onClick={() => navigate("/exercicios")}
          sx={{ color: "#58060A", fontSize: "24px", cursor: "pointer" }}
        >
          Exercícios
        </Box>
        <Box
          onClick={() => navigate("/historico")}
          sx={{ color: "#58060A", fontSize: "24px", cursor: "pointer" }}
        >
          Histórico
        </Box>
        <Box
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          sx={{ color: "#58060A", fontSize: "24px", cursor: "pointer" }}
        >
          Sair
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
