import { Container } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect, useState } from "react";
import { Agenda, Login } from "../components";
import { firebaseClient } from "../config/firebase/client";

function Home() {
  const [auth, setAuth] = useState({
    loading: true,
    user: false,
  });

  useEffect(() => {
    firebaseClient.auth().onAuthStateChanged((user) => {
      setAuth({
        loading: false,
        user,
      });
    });
  }, []);

  if (auth.loading) {
    return (
      <Container centerContent p={4}>
        <Spinner />
      </Container>
    );
  }

  return auth.user ? <Agenda /> : <Login />;
}

export default Home;
