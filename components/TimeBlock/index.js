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
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

import { Input } from "../Input";

function ModalTimeBlock({ isOpen, onClose, children }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Reservar Horário
            </Button>
            <Button variant="ghost">Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export const TimeBlock = ({ time }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevState) => !prevState);

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
  } = useFormik({
    onSubmit: () => {},
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
    <Button p={8} bg="blue.500" color="white" onClick={toggle}>
      {time}

      <ModalTimeBlock isOpen={isOpen} onClose={toggle} time={time}>
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
          />
          <Input
            label="Telefone"
            name="phone"
            value={values.phone}
            error={errors.phone}
            placeholder="(99) 9 9999-9999"
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.phone}
            size="lg"
            mt={4}
          />
        </>
      </ModalTimeBlock>
    </Button>
  );
};
