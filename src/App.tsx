import React from "react";
import { Container } from "@mui/material";
import MainPanel from "./components/MainPanel";

const App: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      <MainPanel />
    </Container>
  );
};

export default App;