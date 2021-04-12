import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useFetch } from "@refetty/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { Logo, useAuth, formatDate } from "../components";
import { addDays, subDays, format } from "date-fns";
import { getToken } from "../config/firebase/client";

const getAgenda = async ({ when }) => {
  const token = await getToken();

  return axios({
    method: "get",
    url: "/api/agenda",
    params: { date: format(when, "yyyy-MM-dd") },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

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

const AgendaBlock = ({ time, name, phone, ...props }) => {
  return (
    <Box
      display="flex"
      bg="gray.100"
      {...props}
      alignItems="center"
      p={4}
      borderRadius={4}
    >
      <Box flex={1}>{time}</Box>
      <Box textAlign="right">
        <Text fontSize="2xl">{name}</Text>
        <Text>{phone}</Text>
      </Box>
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

  console.log("Data", data);

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

      {loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}

      <Box>
        {data?.map((doc) => (
          <AgendaBlock
            key={doc.time}
            name={doc.name}
            phone={doc.phone}
            time={doc.time}
            mt={4}
          />
        ))}
      </Box>
    </Container>
  );
}
