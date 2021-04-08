import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  Container,
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

import firebase from "../config/firebase";
import { Logo } from "../components";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido")
    .required("Preenchimento obrigatório"),
  password: yup.string().required("Preenchimento obrigatório"),
  username: yup.string().required("Preenchimento obrigatório"),
});

export default function Home() {
  const formik = useFormik({
    onSubmit: async (values, form) => {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password);
      console.log("user", user);
    },
    validationSchema,
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  return (
    <Container>
      <Logo />
      <Text p={4}>Crie sua agenda compartilhada</Text>

      <Box>
        <FormControl id="email" p={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && (
            <FormHelperText textColor="#e74c3c">
              {formik.errors.email}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl id="password" p={4}>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && (
            <FormHelperText textColor="#e74c3c">
              {formik.errors.password}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl id="username" p={4} isRequired>
          <InputGroup size="lg">
            <InputLeftAddon children="clock.word/" />
            <Input
              type="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </InputGroup>
          {formik.touched.username && (
            <FormHelperText textColor="#e74c3c">
              {formik.errors.username}
            </FormHelperText>
          )}
        </FormControl>

        <Box p={4}>
          <Button
            width="100%"
            colorScheme="blue"
            isLoading={formik.isSubmitting}
            onClick={formik.handleSubmit}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
      <Link href="/">
        <a>Já tem uma conta? Faça o login</a>
      </Link>
    </Container>
  );
}
