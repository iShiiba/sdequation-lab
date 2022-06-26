import React, { useState, useEffect } from "react";
import Header from "./../../Components/Header";
import { useNavigate } from "react-router-dom";
import CustomButton from "./../../Components/CustomButton";
import { styled } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";
import { ExitAdmin, SaveEmail } from "../../Redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
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
const HistoricoAdm = () => {
  const [name, setName] = useState("Gustavo Moraes");
  const [right, setRight] = useState(15);
  const [wrong, setWrong] = useState(20);
  const [list, setList] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getScore = async () => {
      const response = await fetch(`http://localhost:3003/summary`);
      const data = await response.json();
      const lista = data.summaryList;
      console.log(lista);
      setList(lista);
    };
    getScore();

    return () => {
      dispatch(ExitAdmin());
    }
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
      <Box sx={{ minWidth: "150px", marginTop: "30px" }}>
        <CustomButton text="Sair" onClick={()=>{navigate("/login")}} />
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
            onClick={() => {
              dispatch(SaveEmail({ email: item.email }));
              navigate("/historico");
            }}
          >
            <Box sx={{ fontSize: "40px", color: "#58060A" }}>{item.name}</Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                fontSize: "20px",
              }}
            >
              <Box sx={{ display: "flex", gap: "15px" }}>
                <Box sx={{ color: "green", fontWeight: "bold" }}>
                  Acertos: {item.right}
                </Box>

                <Box sx={{ color: "red", fontWeight: "bold" }}>
                  Erros: {item.wrong}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <ToastContainer />;
    </Box>
  );
};

export default HistoricoAdm;
