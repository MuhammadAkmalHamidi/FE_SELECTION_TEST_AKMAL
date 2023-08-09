import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import  Axios  from "axios";

export const AddSalary = ({userId}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const handleClick = async (value) => {
        try {
            const response = await Axios.post(`http://localhost:2000/user/addSalary`, {
                gaji : value.gaji,
                userId : userId
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button onClick={onOpen}>Atur Gaji</Button>
            <Formik
                initialValues={{
                    gaji:""
                }}
                onSubmit={(value) => {
                    handleClick(value)
                }}
            >
                {(props) => {
                    return (
                        <Modal
                            isOpen={isOpen}
                            onClose={onClose}
                        >
                            <Form>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Atur Gaji Karyawan</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                        <FormControl>
                                            <FormLabel>Atur Gaji</FormLabel>
                                            <Input name="gaji" as={Field} type="INTEGER" />
                                        </FormControl>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button type="Submit" colorScheme='blue' mr={3}>
                                            Simpan
                                        </Button>
                                        <Button onClick={onClose}>Cancel</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Form>
                        </Modal>
                    )
                }}
            </Formik >
        </>
    )
}