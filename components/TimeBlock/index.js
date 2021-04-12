import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import axios from "axios";
import { format } from "date-fns";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

import { Input } from "../Input";

const setSchedule = async ({ date, ...data }) => {
  return axios({
    method: "post",
    url: "/api/schedule",
    data: {
      ...data,
      date: format(date, "yyyy-MM-dd"),
      username: window.location.pathname.replace("/", ""),
    },
  });
};

function ModalTimeBlock({
  isOpen,
  onClose,
  children,
  onComplete,
  isSubmitting,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reserve seu horário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onComplete}
              isLoading={isSubmitting}
            >
              Reservar Horário
            </Button>
            <Button variant="ghost">Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export const TimeBlock = ({ time, date, disabled, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevState) => !prevState);

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    onSubmit: (values) => {
      try {
        setSchedule({ ...values, date, time });
        toggle();
        onSuccess();
      } catch (e) {
        console.log("Error", e);
      }
    },
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Preenchimento obrigatório"),
      phone: yup.string().required("Preenchimento obrigatório"),
    }),
  });

  return (
    <Button
      p={8}
      bg="blue.500"
      color="white"
      onClick={toggle}
      disabled={disabled}
    >
      {time}

      {!disabled && (
        <ModalTimeBlock
          isOpen={isOpen}
          onClose={toggle}
          time={time}
          onComplete={handleSubmit}
          isSubmitting={isSubmitting}
        >
          <>
            <Input
              label="Nome"
              name="name"
              value={values.name}
              error={errors.name}
              placeholder="Digite seu nome"
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.name}
              size="lg"
              disabled={isSubmitting}
            />
            <Input
              label="Telefone"
              name="phone"
              value={values.phone}
              error={errors.phone}
              placeholder="(99) 9 9999-9999"
              mask={["(99) 9999-9999", "(99) 9 9999-9999"]}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.phone}
              size="lg"
              mt={4}
              disabled={isSubmitting}
            />
          </>
        </ModalTimeBlock>
      )}
    </Button>
  );
};
