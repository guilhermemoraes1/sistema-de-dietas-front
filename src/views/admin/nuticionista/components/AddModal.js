import { Box, Button, FormControl, 
    FormErrorMessage, 
    FormHelperText, 
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

export default function AddModal({  isOpen, onClose, }) {
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
            initialValues={{ name: 'Sasuke' }}
            // onSubmit={(values, actions) => {
            //     setTimeout(() => {
            //     alert(JSON.stringify(values, null, 2))
            //     actions.setSubmitting(false)
            //     }, 1000)
            // }}
            >
            {() => (
                <Form>
                <Field name='name' validate={""}>
                    {({ field, form }) => (
                    <FormControl >
                        <FormLabel>First name</FormLabel>
                        <Input {...field} placeholder='name' />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                    )}
                </Field>
                <Field name='name' validate={""}>
                    {({ field, form }) => (
                    <FormControl >
                        <FormLabel>CRN</FormLabel>
                        <Input {...field} placeholder='name' />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                    )}
                </Field>
                <Field name='name' validate={""}>
                    {({ field, form }) => (
                    <FormControl >
                        <FormLabel>First name</FormLabel>
                        <Input {...field} placeholder='name' />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                    )}
                </Field>
                <Box mt={4}>
                    <HStack spacing={10}> 
                        <Button 
                            colorScheme="teal"
                            type="submit"
                            // isLoading={props.isSubmitting}
                            >
                        Submit
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