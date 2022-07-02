import react, { useState, useEffect } from "react";
import Header from "./../../Components/Header";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomButton from "../../Components/CustomButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
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

const sendData = async (data, token) => {
  const response = await fetch("http://localhost:3003/exercises", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
    body: JSON.stringify({ ...data }),
  });
};

const Exercicios = () => {
  const [equation, setEquation] = useState("");
  const [resp1, setResp1] = useState("");
  const [resp2, setResp2] = useState("");
  const [resp3, setResp3] = useState(false);
  const [count, setCount] = useState(2);
  const [a, setA] = useState(1);
  const [b, setB] = useState(Math.floor(Math.random() * 5) + 1);
  const [c, setC] = useState(Math.floor(Math.random() * 10) + 1);
  const [xUm, setXUm] = useState("");
  const [xDois, setXDois] = useState("");
  const [root, setRoot] = useState(false);
  const [verify, setVerify] = useState(false);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(1);

  const email = useSelector(state => state.auth.email);
  const token = window.localStorage.getItem("token");
  
  useEffect(() => {
    if(value === 1){
      setA(1);
      setB(Math.floor(Math.random() * 5) + 1);
      setC(Math.floor(Math.random() * 10) + 1);
    }else{
      setA(Math.floor(Math.random() * (2 - (-2))) + -2);
      setB(Math.floor(Math.random() * (5 - (-5))) + -5);
      setC(Math.floor(Math.random() * (10 - (-10))) + -10);      
    }
    
    setEquation(`${a}x² ${b>0?"+":""} ${b}x ${c>0?"+":""} ${c} = 0`);
  }, [count]);

  const bhaskara = () => {
    const delta = b * b - 4 * a * c;

    if (a == 0) {
      toast.error("O valor de <strong>a</strong>, deve ser diferente de 0");
    } else if (delta < 0) {
      setRoot(true);
    } else {
      const x1 = (-b + Math.sqrt(delta)) / (2 * a);
      const x2 = (-b - Math.sqrt(delta)) / (2 * a);
      setXUm(x1);
      setXDois(x2);
      console.log(x1, x2);
    }
  };

  const result = async () => {
    if (resp1.trim() === "" || resp2.trim() === "") {
      if (!checked) {
        toast.error("Preencha os campos!");
        return;
      }
    }
    await bhaskara();

    if (
      (resp1 === xUm && resp2 === xDois) ||
      (checked && root) ||
      (resp2 === xUm && resp1 === xDois)
    ) {
      toast.success("Resposta correta!");
      setVerify(true);
      setRoot(false);
      setResp1("");
      setResp2("");
      setCount(count + 1);
    } else {
      toast.error("Resposta incorreta!");
      setResp1("");
      setResp2("");
      setCount(count + 1);
    }
    sendData({ equation, difficulty: value, right: verify, email }, token);
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ height: "100vh", width: "100vw", backgroundColor: "#FFF9F8" }}>
      <Header />
      <Box
        sx={{
          height: "65%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "100px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            // backgroundColor: "pink",
          }}
        >
          <FormControl sx={{ display: "flex" }}>
            <FormLabel
              id="demo-controlled-radio-buttons-group"
              sx={{ color: "#58060A", textAlign: "center" }}
            >
              Dificuldade
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChangeRadio}
              row
            >
              <FormControlLabel
                value="1"
                control={
                  <Radio
                    sx={{
                      color: "#58060A",
                      "&.Mui-checked": {
                        color: "#58060A",
                      },
                    }}
                  />
                }
                label="Facil"
                sx={{ color: "#58060A" }}
              />
              <FormControlLabel
                value="2"
                control={
                  <Radio
                    sx={{
                      color: "#58060A",
                      "&.Mui-checked": {
                        color: "#58060A",
                      },
                    }}
                  />
                }
                label="Dificil"
                sx={{ color: "#58060A" }}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            // height: "85%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "100px",
          }}
        >
          <Box sx={{ fontSize: "60px", color: "#58060A" }}>{`${equation}`}</Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5%",
            }}
          >
            <Box
              sx={{
                minWidth: "120px",
                width: "5%",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Box sx={{ fontSize: "30px", color: "#58060A" }}>X1:</Box>
              <CssTextField
                id="resp1"
                type="text"
                size="small"
                value={resp1}
                onChange={(e) => setResp1(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                minWidth: "120px",
                width: "5%",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Box sx={{ fontSize: "30px", color: "#58060A" }}>X2:</Box>
              <CssTextField
                id="resp2"
                type="text"
                size="small"
                value={resp2}
                onChange={(e) => setResp2(e.target.value)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "25%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    sx={{
                      color: "rgb(88, 6, 10)",
                      "&.Mui-checked": {
                        color: "rgb(88, 6, 10)",
                      },
                    }}
                  />
                }
                label="Sem raízes reais"
                sx={{ color: "rgb(88, 6, 10)" }}
              />
            </FormGroup>
            <CustomButton
              text="Proximo"
              onClick={() => {
                result();
              }}
            ></CustomButton>
          </Box>
        </Box>
      </Box>
      <ToastContainer />;
    </Box>
  );
};

export default Exercicios;
