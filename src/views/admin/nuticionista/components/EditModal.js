import { Box, Button, FormControl, 
    FormErrorMessage,  
    FormLabel,  
    HStack,  
    Input,  
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    } from "@chakra-ui/react";
import { Form, Field, Formik } from "formik";
import * as Yup from 'yup';

const schemaNutricionista = Yup.object().shape({
    nome: Yup.string()
        .trim()
        .min(5)
        .max(100)
        .required("Campo obrigatório"),

    email: Yup.string()
        .email()
        .trim()
        .min(5)
        .max(100)
        .required("Campo obrigatório"),
    crn: Yup.string()
        .trim()
        .min(5)
        .max(10)
        .required("Campo obrigatório"),    
});

export default function EditModal({  isOpen, onClose, handleSubmit, nutricionista }) {
  return (
    <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="lg"
        scrollBehavior ={'inside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastro Nutricionista </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>

            <Formik
            initialValues={{ 
                ...nutricionista
            }}
            validationSchema={schemaNutricionista}
            onSubmit={(values, actions) => {
                handleSubmit(values,actions)
                onClose()     
            }}
            >
            {(props) => (
                <Form>
                <Field name='nome' >
                    {({ field, form }) => (
                    <FormControl  isInvalid={form.errors.nome && form.touched.nome}>
                        <FormLabel>Nome</FormLabel>
                        <Input {...field} placeholder='Digite seu nome' type="text" />
                        <FormErrorMessage>{form.errors.nome}</FormErrorMessage>
                    </FormControl>
                    )}
                </Field>
                <Field name='email'>
                    {({ field, form }) => (
                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel>Email</FormLabel>
                        <Input {...field} placeholder='Digite seu email' type="email"/>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                    )}
                </Field>
                <Field name='crn' >
                    {({ field, form }) => (
                    <FormControl isInvalid={form.errors.crn && form.touched.crn}>
                        <FormLabel>CRN</FormLabel>
                        <Input {...field} placeholder='Digite CRN' type="text"/>
                        <FormErrorMessage>{form.errors.crn}</FormErrorMessage>
                    </FormControl>
                    )}
                </Field>
                <Box mt={4}>
                    <HStack spacing={10}> 
                        <Button 
                            colorScheme="teal"
                            type="submit"
                            isLoading={props.isSubmitting}
                            >
                        Adicionar
                        </Button>

                        <Button 
                            colorScheme="red" 
                            type="button"
                            onClick={onClose}>
                        Cancelar
                        </Button>
                    </HStack>
                </Box>
                
                </Form>
            )}
            </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}