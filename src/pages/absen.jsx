import { Box, Button, Flex, Image, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Jam } from "../components/jam"
import { Navbar } from "../components/navbar"
import { useNavigate } from "react-router-dom"
import Axios from "axios"

export const Absen = () => {
    const toast = useToast()
    const [currentTime, setCurrentTime] = useState(new Date())
    const token = localStorage.getItem('token')
    const jam = currentTime.getHours().toString()
    const navigate = useNavigate()

    const clockIn = async () => {
        try {
            const response = await Axios.post(`http://localhost:2000/absen/clockIn`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast({
                title: "Terima Kasih!",
                description: "Anda Sudah Absen Masuk",
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top"
            })
            setTimeout(() => {
                window.location.reload()
            }, 800)
        } catch (error) {
            toast({
                title: "Maaf",
                description: "Anda Sudah Absen Masuk Hari Ini",
                status: "error",
                duration: 1000,
                isClosable: true,
                position: "top"

            })
        }
    }
    const clockOut = async () => {
        try {
            const response = await Axios.post(`http://localhost:2000/absen/clockOut`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast({
                title: "Terima kasih",
                description: "Anda Sudah Absen Keluar",
                status: "success",
                duration: 1000,
                isClosable: true,
                position: "top"
            })
            setTimeout(() => {
                window.location.reload()
            }, 800)
        } catch (error) {
            toast({
                title: "Maaf",
                description: "Anda Sudah Absen Keluar Hari Ini",
                status: "error",
                duration: 1000,
                isClosable: true,
                position: "top"

            })
        }
    }


    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    })
    return (
        <Flex  w="100%" h={"100%"}>
        <Flex  w="100%" h={"100%"}>
            <Flex position="fixed" zIndex="10">
                <Navbar />
            </Flex>
            <Box pl={{base:"100px"}} bgRepeat={"none"}  w="100%" h={"100vh"} bgImage="url('https://wallpaperaccess.com/full/4527176.jpg')" bgSize="cover">
                <Flex position="relative" justifyContent="center" pt="100px">
                    <Box bgColor="rgba(255,255,255,0.5)" h={{base:"150px", sm:"170px", md:"200px", lg:"250px"}} w={{base:"250px", sm:"270px", md:"300px", lg:"400px"}} borderRadius="20px" boxShadow="0px 0px 15px gray">
                        <Flex h={{base:"100px", sm:"120px", md:"140px", lg:"200px"}} justifyContent="center" lineHeight="150px"> <Jam /> </Flex>
                        <Flex justifyContent="space-evenly">
                                {parseInt(jam) < 8 || parseInt(jam) > 12 ? (<Button isDisabled={true} _active={{bgColor:"#0abab5"}} boxShadow={"0px 0px 5px gray"} _hover={{ bgClip:"#0abab5"}} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Masuk</Button>) : (<Button boxShadow={"0px 0px 5px gray"} onClick={clockIn} _hover={{ boxShadow: "0px 0px 10px #0abab5" }} transition={"0.3s"} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Masuk</Button>)}
                                {/* <Button boxShadow={"0px 0px 5px gray"} onClick={clockIn} _hover={{ boxShadow: "0px 0px 10px #0abab5" }} transition={"0.3s"} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Masuk</Button> */}
                                {parseInt(jam) < 18 || parseInt(jam) >= 21 ? (<Button isDisabled={true} boxShadow={"0px 0px 5px gray"} _hover={{bgColor:"#0abab5"}} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Keluar</Button>) : (<Button boxShadow={"0px 0px 5px gray"} onClick={clockOut} _hover={{ boxShadow: "0px 0px 10px #0abab5" }} transition={"0.3s"} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Keluar</Button>)}
                                {/* <Button boxShadow={"0px 0px 5px gray"} onClick={clockOut} _hover={{ boxShadow: "0px 0px 10px #0abab5" }} transition={"0.3s"} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Keluar</Button> */}
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    )
}