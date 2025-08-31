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

const schemaDieta = Yup.object().shape({
    nome_dieta: Yup.string()
        .trim()
        .min(5)
        .max(100)
        .required("Campo obrigatório"),

    calorias_diarias: Yup.string()
        .trim()
        .min(3)
        .max(100)
        .required("Campo obrigatório"),
});

export default function EditModal({  isOpen, onClose, handleSubmit, dieta }) {
  return (
    <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="lg"
        scrollBehavior ={'inside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Dieta</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>

            <Formik
            initialValues={{ 
                ...dieta
            }}
            validationSchema={schemaDieta}
            onSubmit={(values, actions) => {
                handleSubmit(values,actions)
                onClose()     
            }}
            >
            {(props) => (
                <Form>
                <Field name='nome_dieta' >
                    {({ field, form }) => (
                    <FormControl  isInvalid={form.errors.nome_dieta && form.touched.nome_dieta}>
                        <FormLabel>Nome da Dieta</FormLabel>
                        <Input {...field}/>
                        <FormErrorMessage>{form.errors.nome_dieta}</FormErrorMessage>
                    </FormControl>
                    )}
                </Field>
                <Field name='calorias_diarias'>
                    {({ field, form }) => (
                    <FormControl isInvalid={form.errors.calorias_diarias && form.touched.calorias_diarias}>
                        <FormLabel>Calorias Diárias</FormLabel>
                        <Input {...field}/>
                        <FormErrorMessage>{form.errors.calorias_diarias}</FormErrorMessage>
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
                        Salvar
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