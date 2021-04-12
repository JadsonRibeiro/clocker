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
} from "@chakra-ui/react";

import { Logo, useAuth } from "./../components";
import { useRouter } from "next/router";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido")
    .required("Preenchimento obrigatório"),
  password: yup.string().required("Preenchimento obrigatório"),
});

export default function Login() {
  const [auth, { login }] = useAuth();
  const router = useRouter();

  const formik = useFormik({
    onSubmit: login,
    validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    console.log("Auth", auth);
    auth.user && router.push("/agenda");
  }, [auth.user]);

  return (
    <Container centerContent p={4}>
      <Logo size={200} />
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

        <Box p={4}>
          <Button
            width="100%"
            colorScheme="blue"
            isLoading={formik.isSubmitting}
            onClick={formik.handleSubmit}
          >
            Login
          </Button>
        </Box>
      </Box>
      <Link href="/signup">
        <a>Ainda não tem uma conta? Cadastre-se</a>
      </Link>
    </Container>
  );
}
