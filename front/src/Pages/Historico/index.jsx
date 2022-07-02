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

const Historico = () => {
  const [equation, setEquation] = useState("x²+10x-3=0");
  const [right, setRight] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [difficulty, setDifficulty] = useState("facil");
  const [list, setList] = useState([]);

  const getEmail = useSelector((state) => state.auth.email);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    
    const getData = async () => {
      const response = await fetch(
        `http://localhost:3003/exercises/${getEmail}`,
        {
          method: "GET",
          headers: {
            "token": token,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setList(data.exerciseList);
    };

    const getScore = async () => {
      const response = await fetch(`http://localhost:3003/summary/${getEmail}`,
      {
        method: "GET",
        headers: {
          "token": token,
        },
      });
      const data = await response.json();
      const userRight = data.summaryInfo.right;
      const userWrong = data.summaryInfo.wrong;
      setRight(userRight);
      setWrong(userWrong);
    };

    getData();
    getScore();
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "#FFF9F8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "250px",
          minWidth: "250px",
          height: "5%",
          marginTop: "20px",
        }}
      >
        <Box sx={{ color: "green", fontWeight: "bold", fontSize: "20px" }}>
          Acertos: {right}
        </Box>
        <Box sx={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
          Erros: {wrong}
        </Box>
      </Box>
      <Box
        sx={{
          height: "85%",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {list.map((item) => (
          <Box
            sx={{
              minWidth: "250px",
              height: "15%",
              border: "2px solid #58060A",
              backgroundColor: "#FFF6F4",
              cursor: "pointer",
              boxShadow: "12px 12px 12px rgba(162, 162, 162, 0.25);",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "10px 40px",
              margin: "20px",
            }}
          >
            <Box sx={{ fontSize: "40px", color: "#58060A" }}>
              {item.equation}
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                fontSize: "20px",
              }}
            >
              <Box sx={{ color: "#58060A", textTransform: "capitalize" }}>
                {item.difficulty == 1 ? "Facil" : "Dificil"}
              </Box>
              <Box>
                {item.right ? (
                  <Box sx={{ color: "green", fontWeight: "bold" }}>Correto</Box>
                ) : (
                  <Box sx={{ color: "red", fontWeight: "bold" }}>Incorreto</Box>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <ToastContainer />;
    </Box>
  );
};

export default Historico;
