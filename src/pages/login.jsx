import { Box, Button, Flex, FormControl, Input, VStack, useToast } from "@chakra-ui/react"
import { CiLock } from 'react-icons/ci'
import { HiOutlineMail } from 'react-icons/hi'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { setValue } from "../redux/userSlice"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Axios from 'axios'
import * as Yup from 'yup'

export const Login = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginSchema = Yup.object().shape({
        email: Yup.string().required('Email Perlu Di Isi'),
        password: Yup.string().required("Password Perlu Di Isi")
    })
    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    const onLogin = async (value) => {
        try {
            const response = await Axios.post(`https://appsensi-be-muhammadakmalhamidi.vercel.app/user/login`, value)
            dispatch(setValue(response.data.result));
            console.log(response);
            localStorage.setItem("token", response.data.token);
            if (response.data.result.roleId === 1) {
                navigate('/listKaryawan')
            }
            else {
                navigate('/Absensi')
            }
            if (response.data.result.isAdmin) {
                toast({
                    title: "Selamat Datang!",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                    position: "top"
                });
            }
            else {
                toast({
                    title: "Selamat Datang!",
                    description: "Mohon Isi Absensi",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                    position: "top"
                });
            }
        } catch (error) {
            toast({
                title: "asd",
                status: "warning",
                duration: 1000,
                isClosable: true,
                position: "top"
            });
        }
    }


    return (
        <>
            <Box w={"100vw"} h={"100vh"} bgGradient={"linear(to-r, #009698, #0abab5)"}>
                <Flex justifyContent={"center"}>
                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        validationSchema={loginSchema}
                        onSubmit={(value, action) => {
                            onLogin(value)
                        }}>
                        {(props) => {
                            return (
                                <Form>
                                    <Box mt={"150px"}>
                                        <Flex justifyContent={"center"} fontWeight={"thin"} fontSize={{ base: "30px", sm: "40px", md: "70px" }} color={"white"} textShadow={"0px 0px 10px white"}>APPsensi Login</Flex>
                                        <FormControl mb={"50px"}>
                                            <Flex justifyContent={"center"} mt={"70px"}>
                                                <VStack alignItems={"center"}>
                                                    <Flex px={{ base: "20px" }} justifyContent={"start"} alignItems={"center"}>
                                                        <Flex zIndex={"3"} position={"absolute"} bgColor={"white"} boxSize={"60px"} justifyContent={"center"} alignItems={"center"} borderRadius={"50%"}>
                                                            <HiOutlineMail size={"25px"} />
                                                        </Flex>
                                                        <Input transition={"0.3s"} as={Field} name="email" position={"relative"} bgColor={"rgba(255,255,255,0.7)"} border={"none"} h={"50px"} borderRadius={'30px'} w={{ base: "250px", sm: "300px", md: "500px" }} placeholder="Email" pl={"70px"} color={"gray.700"} />
                                                    </Flex>
                                                    <ErrorMessage
                                                        component={"box"}
                                                        name="email"
                                                        style={{ color: 'red' }}
                                                    />
                                                </VStack>
                                            </Flex>
                                        </FormControl>
                                        <FormControl>
                                            <Flex justifyContent={"center"}>
                                                <VStack>
                                                    <Flex px={{ base: "20px" }} justifyContent={"end"} alignItems={"center"}>
                                                        <Flex justifyContent={"center"} zIndex={"3"} position={"absolute"} bgColor={"white"} boxSize={"60px"} alignItems={"center"} borderRadius={"50%"}>
                                                            <CiLock size={"25px"} />
                                                        </Flex>
                                                        <Input transition={"0.3s"} as={Field} type={show ? 'text' : 'password'} name="password" bgColor={"rgba(255,255,255,0.7)"} border={"none"} borderRadius={'30px'} h={"50px"} w={{ base: "250px", sm: "300px", md: "500px" }} placeholder="Password" color={"gray.700"} />
                                                        <Flex bgColor={"white"} position={"absolute"} mr={"40px"} borderRadius={"20px"} p={"7px"} align={"center"} cursor={"pointer"} size='sm' onClick={handleClick}>
                                                            <Box mr={"30px"}>
                                                                {show ? <> <FiEye size={"20px"} /> </> : <> <FiEyeOff size={"20px"} /> </>}
                                                            </Box>
                                                        </Flex>
                                                    </Flex>
                                                    <ErrorMessage
                                                        component={"box"}
                                                        name="email"
                                                        style={{ color: 'red' }}
                                                    />
                                                </VStack>
                                            </Flex>
                                        </FormControl>
                                        <Flex justifyContent={"center"} mt={"60px"}>
                                            <Button type="submit" w={{ base: "150px", sm: "250px", md: "300px" }} bgColor={"white"} borderRadius={"30px"} p={"10px"} justifyContent={"center"} fontFamily={"sans-serif"} _hover={{ bgColor: "gray.200" }} _active={{ transform: "scale(0.97)" }} transition={"0.3s"} cursor={"pointer"} color={"gray.600"}>LOGIN</Button>
                                        </Flex>
                                    </Box>
                                </Form>
                            )
                        }}
                    </Formik>
                </Flex>
            </Box>
        </>
    )
}