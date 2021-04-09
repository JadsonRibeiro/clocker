import { Button } from "@chakra-ui/button";
import { Container } from "@chakra-ui/layout";
import React from "react";
import { firebaseClient } from "../../config/firebase";

export const Agenda = () => {
  return (
    <Container>
      <Button onClick={() => firebaseClient.auth().signOut()}>Sair</Button>
    </Container>
  );
};
