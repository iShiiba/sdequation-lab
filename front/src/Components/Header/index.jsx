import React, { useNa } from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Header = ({ text }) => {
  const navigate = useNavigate();
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
          onClick={() => console.log("weon")}
          sx={{ color: "#58060A", fontSize: "24px", cursor: "pointer" }}
        >
          Nome
        </Box>
        <Box sx={{ color: "#58060A", fontSize: "24px" }}>Exercícios</Box>
        <Box sx={{ color: "#58060A", fontSize: "24px" }}>Histórico</Box>
        <Box sx={{ color: "#58060A", fontSize: "24px" }}>Sair</Box>
      </Box>
    </Box>
  );
};

export default Header;
