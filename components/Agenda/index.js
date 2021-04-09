import { Button } from "@chakra-ui/button";
import { Container } from "@chakra-ui/layout";
import React from "react";
import firebase from "../../config/firebase";

export const Agenda = () => {
  return (
    <Container>
      <Button onClick={() => firebase.auth().signOut()}>Sair</Button>
    </Container>
  );
};
