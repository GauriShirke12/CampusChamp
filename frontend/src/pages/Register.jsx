import React from "react";
import { Container, Typography } from "@mui/material";
import RegistrationForm from "../components/RegistrationForm";

function RegisterPage() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Register Now</Typography>
      <RegistrationForm />
    </Container>
  );
}

export default RegisterPage;
