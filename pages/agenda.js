import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useFetch } from "@refetty/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Container, IconButton } from "@chakra-ui/react";

import { Logo, useAuth, formatDate } from "../components";
import { addDays, subDays } from "date-fns";

const getAgenda = ({ token, when }) =>
  axios({
    method: "get",
    url: "/api/agenda",
    params: { when },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const Header = ({ children }) => {
  return (
    <Box
      p={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {children}
    </Box>
  );
};

export default function Agenda() {
  const [auth, { logout }] = useAuth();
  const router = useRouter();
  const [when, setWhen] = useState(() => new Date());
  const [data, { loading, status, error }, fetch] = useFetch(getAgenda, {
    lazy: true,
  });

  // prevState é usado para resolver problema de concorrencia do setState
  const addDay = () => setWhen((prevState) => addDays(prevState, 1));
  const removeDay = () => setWhen((prevState) => subDays(prevState, 1));

  useEffect(() => {
    !auth.user && router.push("/");
  }, [auth.user]);

  useEffect(() => {
    fetch({ when });
  }, [when]);

  return (
    <Container>
      <Header>
        <Logo size={175} />
        <Button onClick={logout}>Sair</Button>
      </Header>
      <Box mt={8} display="flex" alignItems="center">
        <IconButton
          icon={<ChevronLeftIcon />}
          bg="transparent"
          onClick={removeDay}
        />
        <Box textAlign="center" flex={1}>
          {formatDate(when, "PPPP")}
        </Box>
        <IconButton
          icon={<ChevronRightIcon />}
          bg="transparent"
          onClick={addDay}
        />
      </Box>
    </Container>
  );
}
