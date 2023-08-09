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
} from "@chakra-ui/react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import * as Yup from 'yup'

export const AddEmploye = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const admin = useSelector((state) => state.user.value)
    const toast = useToast()

    const regisSchema = Yup.object().shape({
        name: Yup.string().required('Nama Perlu Di Isi!'),
        email: Yup.string().email('Data Perlu Berbentuk Email').required('Email Perlu Di Isi!'),
        phoneNumber : Yup.string().required('Nomor Handphone Perlu Di Isi!'),
        password : Yup.string().required("Password Perlu Di Isi")
        .min(6, "Panjang Password Minimal 6 Karakter")
        .matches(/^(?=.*[A-Z])/, "Password Minimal Berisikan 1 Huruf Kapital")
        .matches(/^(?=.*(\W|_))/, "Password Minimal Berisikan 1 Simbol")
        .matches(/.*[0-9].*/, "Password Minimal Berisikan 1 Angka"),
        birthDay : Yup.string().required('Tanggal Lahir Perlu Di Isi!')
    })
    
    

    const handleClick = async (value) => {
        try {
            const response = await Axios.post(`http://localhost:2000/user/register`, value)
            toast({
                title: "Selamat!",
                description: "Berhasil Menambahkan Data Karyawan Baru",
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top"
            })
            setTimeout(() => {
                window.location.reload()
            }, 800)

        } catch (error) {
            console.log(error);
        }
    }
        useEffect(() => {
            if (!token) {
                navigate('/')
            }
        },[])
    return (

        <>
            <Button onClick={onOpen} justifyContent={"center"} bgColor={"#009698"} mt={"15px"} h={"50px"} lineHeight={"50px"} w={"200px"} borderRadius={"25px"} color={"white"} fontWeight={"thin"} textShadow={"0px 0px 5px white"} cursor={"pointer"} >Tambahkan Karyawan</Button>

            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    birthDay: ''
                }}
                validationSchema={regisSchema}
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
                                    <ModalHeader>Tambahkan Karyawan</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                        <FormControl>
                                            <FormLabel>Nama</FormLabel>
                                            <Input as={Field} name="name" placeholder='Nama Karyawan' />
                                            <ErrorMessage component={'Box'} style={{color:"red"}} name="name" />
                                        </FormControl>

                                        <FormControl mt={4}>
                                            <FormLabel>Email</FormLabel>
                                            <Input as={Field} name="email" placeholder='Email' />
                                            <ErrorMessage component={'Box'} style={{color:"red"}} name="email" />
                                        </FormControl>
                                        <FormControl mt={4}>
                                            <FormLabel>Nomor Handphone</FormLabel>
                                            <Input as={Field} name="phoneNumber" placeholder='Nomor Handphone' />
                                            <ErrorMessage component={'Box'} style={{color:"red"}} name="phoneNumber" />
                                        </FormControl>
                                        <FormControl mt={4}>
                                            <FormLabel>Tanggal Lahir</FormLabel>
                                            <Input type="date" as={Field} name="birthDay" placeholder='Tanggal Lahir' />
                                            <ErrorMessage component={'Box'} style={{color:"red"}} name="birthDay" />
                                        </FormControl>
                                        <FormControl mt={4}>
                                            <FormLabel>Password</FormLabel>
                                            <Input as={Field} name="password" placeholder='Password' />
                                            <ErrorMessage component={'Box'} style={{color:"red"}} name="password" />
                                        </FormControl>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button type="submit" bgColor={"cyan.700"} color={"white"} mr={3}>
                                            Buat
                                        </Button>
                                        <Button onClick={onClose}>Cancel</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Form>
                        </Modal>
                    )
                }}
            </Formik>
        </>
    )
}