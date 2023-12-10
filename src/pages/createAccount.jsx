import { Box, Button, Flex, FormControl, Input, VStack, useToast } from "@chakra-ui/react"
import { BiLockAlt } from 'react-icons/bi'
import { AiOutlinePhone } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import { RxPerson } from 'react-icons/rx'
import { LiaBabyCarriageSolid } from 'react-icons/lia'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Axios from 'axios'
import * as Yup from 'yup'

export const CreateAccount = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const toast = useToast()
    const navigate = useNavigate()

    const regisSchema = Yup.object().shape({
        name: Yup.string().required('Nama Perlu Di Isi!'),
        email: Yup.string().email('Data Perlu Berbentuk Email').required('Email Perlu Di Isi!'),
        phoneNumber : Yup.string().required('Nomor Handphone Perlu Di Isi!'),
        password : Yup.string().required("Password Perlu Di Isi")
        .min(8, "Panjang Password Minimal 6 Karakter")
        .matches(/^(?=.*[A-Z])/, "Password Minimal Berisikan 1 Huruf Kapital")
        .matches(/^(?=.*(\W|_))/, "Password Minimal Berisikan 1 Simbol")
        .matches(/.*[0-9].*/, "Password Minimal Berisikan 1 Angka"),
        birthDay : Yup.string().required('Tanggal Lahir Perlu Di Isi!')
    })

    const register = async (value) => {
        try {
            const response = await Axios.post(`https://be-selection-test-akmal.vercel.app/user/register`, value)
            toast({
                title: "Selamat!",
                description: "Berhasil Menambahkan Data Karyawan Baru",
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top"
            })
            setTimeout(() => {
                navigate('/')
            }, 800)

        } catch (error) {
            console.log(error);
        }
    }

    const back = () => {
        navigate('/')
    }

    return (
        <Flex justifyContent={"center"} bgGradient={"linear(to-r, #009698, #0abab5)"} w={"100vw"} h={"100vh"}>
            <Flex justifyContent={"center"} mt={"0px"}>
                <Box>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                            phoneNumber: "",
                            birthDay:"",
                            name:""
                        }}
                        validationSchema={regisSchema}
                        onSubmit={(value, action) => {
                            register(value)
                        }}>
                        {(props) => {
                            return (
                                <Form>
                                    <Box mt={"10px"}>
                                        <Flex justifyContent={"center"} onClick={back} cursor={"pointer"} fontWeight={"thin"} fontSize={"50px"} color={"white"} textShadow={"0px 0px 10px white"}>APPsensi</Flex>
                                        <FormControl  mb={"30px"}>
                                            <Flex mt={"30px"}>
                                                <VStack>
                                                    <Flex alignItems={"center"}>
                                                        <Flex justifyContent={"center"} mr={"10px"} bgColor={"white"} boxSize={"60px"} alignItems={"center"} borderRadius={"50%"}>
                                                            <RxPerson size={"25px"} />
                                                        </Flex>
                                                        <Flex justifyContent={"end"} align={"center"}>
                                                            <Input as={Field} name="name" bgColor={"rgba(255,255,255,0.7)"} border={"none"} borderRadius={'30px'} h={"50px"} w={"400px"} placeholder="Nama" color={"gray.700"} />
                                                        </Flex>
                                                    </Flex>
                                                    <ErrorMessage
                                                        component={"box"}
                                                        name="name"
                                                        style={{ color: 'red' }}
                                                    />
                                                </VStack>
                                            </Flex>
                                        </FormControl>
                                        <FormControl mb={"30px"}>
                                            <Flex >
                                                <VStack alignItems={"center"}>
                                                    <Flex justifyContent={"start"} alignItems={"center"}>
                                                        <Flex mr={"10px"} zIndex={"3"} bgColor={"white"} boxSize={"60px"} justifyContent={"center"} alignItems={"center"} borderRadius={"50%"}>
                                                            <HiOutlineMail size={"25px"} />
                                                        </Flex>
                                                        <Input as={Field} name="email" bgColor={"rgba(255,255,255,0.7)"} border={"none"} h={"50px"} borderRadius={'30px'} w={"400px"} placeholder="Email" color={"gray.700"} />
                                                    </Flex>
                                                    <ErrorMessage
                                                        component={"box"}
                                                        name="email"
                                                        style={{ color: 'red' }}
                                                    />
                                                </VStack>
                                            </Flex>
                                        </FormControl>
                                        <FormControl  mb={"30px"}>
                                            <Flex >
                                                <VStack>
                                                    <Flex alignItems={"center"}>
                                                        <Flex justifyContent={"center"} mr={"10px"} bgColor={"white"} boxSize={"60px"} alignItems={"center"} borderRadius={"50%"}>
                                                            <AiOutlinePhone size={"25px"} />
                                                        </Flex>
                                                        <Flex justifyContent={"end"} align={"center"}>
                                                            <Input as={Field} name="phoneNumber" bgColor={"rgba(255,255,255,0.7)"} border={"none"} borderRadius={'30px'} h={"50px"} w={"400px"} placeholder="Nomor Handphone" color={"gray.700"} />
                                                        </Flex>
                                                    </Flex>
                                                    <ErrorMessage
                                                        component={"box"}
                                                        name="phoneNumber"
                                                        style={{ color: 'red' }}
                                                    />
                                                </VStack>
                                            </Flex>
                                        </FormControl>
                                        <FormControl  mb={"30px"}>
                                            <Flex >
                                                <VStack>
                                                    <Flex alignItems={"center"}>
                                                        <Flex justifyContent={"center"} mr={"10px"} bgColor={"white"} boxSize={"60px"} alignItems={"center"} borderRadius={"50%"}>
                                                            <LiaBabyCarriageSolid size={"25px"} />
                                                        </Flex>
                                                        <Flex justifyContent={"end"} align={"center"}>
                                                            <Input as={Field} type="date" name="birthDay" bgColor={"rgba(255,255,255,0.7)"} border={"none"} borderRadius={'30px'} h={"50px"} w={"400px"} placeholder="Tanggal Lahir" color={"gray.700"} />
                                                        </Flex>
                                                    </Flex>
                                                    <ErrorMessage
                                                        component={"box"}
                                                        name="birthDay"
                                                        style={{ color: 'red' }}
                                                    />
                                                </VStack>
                                            </Flex>
                                        </FormControl>
                                        <FormControl>
                                            <Flex >
                                                <VStack>
                                                    <Flex alignItems={"center"}>
                                                        <Flex justifyContent={"center"} mr={"10px"} bgColor={"white"} boxSize={"60px"} alignItems={"center"} borderRadius={"50%"}>
                                                            <BiLockAlt size={"25px"} />
                                                        </Flex>
                                                        <Flex justifyContent={"end"} align={"center"}>
                                                            <Input as={Field} type={show ? 'text' : 'password'} position={"relative"} name="password" bgColor={"rgba(255,255,255,0.7)"} border={"none"} borderRadius={'30px'} h={"50px"} w={"400px"} placeholder="Password" color={"gray.700"} />
                                                            <Flex bgColor={"white"} position={"absolute"} mr={"10px"} borderRadius={"20px"} p={"7px"} align={"center"} cursor={"pointer"} size='sm' onClick={handleClick}>
                                                                {show ? <> <FiEye size={"20px"} /> </> : <> <FiEyeOff size={"20px"} /> </>}
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                    <ErrorMessage
                                                        component={"box"}
                                                        name="password"
                                                        style={{ color: 'red' }}
                                                    />
                                                </VStack>
                                            </Flex>
                                        </FormControl>
                                        <Flex justifyContent={"center"} mt={"30px"}>
                                            <Button type="submit" w={"300px"} bgColor={"white"} borderRadius={"30px"} p={"10px"} justifyContent={"center"} fontFamily={"sans-serif"} _hover={{ bgColor: "gray.200" }} _active={{ transform: "scale(0.97)" }} transition={"0.3s"} cursor={"pointer"} color={"gray.600"}>Buat Akun</Button>
                                        </Flex>
                                    </Box>
                                </Form>
                            )
                        }}
                    </Formik>
                </Box>
            </Flex>
        </Flex>
    )
}