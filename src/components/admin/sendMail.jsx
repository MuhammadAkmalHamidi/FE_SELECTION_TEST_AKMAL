import { Box, Button, Flex, FormControl, Input, useToast } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { BsFillSendFill } from 'react-icons/bs'
import Axios from "axios"

export const SendMail = () => {
    const toast = useToast()

    const sendEmail = async (value) => {
        try {
            const response = await Axios.post(`http://localhost:2000/user/createAccount`, value)
            toast({
                description:"Email Berhasil Di Kirim",
                duration:"1000",
                isClosable: true,
                position:"top"
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Flex ml={"30px"} alignItems={"center"}>
            <Flex>
                <Formik
                    initialValues={{
                        email: ''
                    }}
                    onSubmit={(value) => {
                        sendEmail(value)
                    }}
                >
                    <Form>
                        <FormControl>
                            <Flex justifyContent={"end"} align={"center"} mt={"15px"}>
                                <Input as={Field} name="email" position={"relative"} _focus={{ w: "350px", borderColor: "#009698" }} _hover={{ borderColor: "#009698" }} h={"50px"} transition={"0.3s"} w={"100px"} borderRadius={"25px"} border={"4px solid"} borderColor={"#009698"} />
                                <Flex position={"absolute"} zIndex={"3"} alignItem={"center"} justifyContent={"end"} mr={"6px"}>
                                    <Button type="submit" cursor={"pointer"} _active={{ transform: "scale(1.2)" }} align={"center"} zIndex={"10"} borderRadius={"20px"} bgColor={"#009698"} p={"10px"}>
                                        <BsFillSendFill color="white" />
                                    </Button>
                                </Flex>
                            </Flex>
                        </FormControl>
                    </Form>
                </Formik>
            </Flex>
        </Flex>
    )
}