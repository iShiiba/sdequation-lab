import React from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = ({text, onClick}) => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    width: "100%",
    backgroundColor: 'rgb(88, 6, 10)',
    "&:hover": {
      backgroundColor: 'rgb(88, 6, 10)',
    },
  }));
  return (
    <Box onClick={onClick}>
      <ColorButton variant="contained">{text}</ColorButton>
    </Box>
  );
};

export default CustomButton;