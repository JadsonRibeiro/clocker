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
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";

import { Logo, useAuth, formatDate, TimeBlock } from "../components";
import { addDays, format, subDays } from "date-fns";

const getSchedule = async ({ when, username }) => {
  return axios({
    method: "get",
    url: "/api/schedule",
    params: {
      date: format(when, "yyyy-MM-dd"),
      username,
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

export default function Agenda() {
  const [auth, { logout }] = useAuth();
  const router = useRouter();
  const [when, setWhen] = useState(() => new Date());
  const [data, { loading, status, error }, fetch] = useFetch(getSchedule, {
    lazy: true,
  });

  // prevState é usado para resolver problema de concorrencia do setState
  const addDay = () => setWhen((prevState) => addDays(prevState, 1));
  const removeDay = () => setWhen((prevState) => subDays(prevState, 1));

  useEffect(() => {
    fetch({ when, username: router.query.username });
  }, [when, router.query.username]);

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
      <SimpleGrid spacing={4} columns={2} p={4}>
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        {data?.map(({ time, isBlocked }) => (
          <TimeBlock key={time} time={time} date={when} disabled={isBlocked} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
