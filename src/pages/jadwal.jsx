import { Box, Flex } from "@chakra-ui/react"
import { Navbar } from "../components/navbar"
import axios from "axios"
import { useEffect, useState } from "react"

export const Jadwal = () => {
    const [data, setData] = useState([])

    const jadwal = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/jadwal`)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const besok = new Date();
    besok.setDate(besok.getDate() + 1);
    const selectedDate = new Date().getHours() >= 10 ? new Date() : besok;
    const formattedDate = selectedDate.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    useEffect(() => {
        jadwal()
    }, [])


    return (
        <Flex>
            <Flex> <Navbar /> </Flex>
            <Box pl={{lg:"140px", sm:"none"}} w={"full"}>
                <Flex justifyContent={"center"} w={"full"} pt={"20px"} fontSize={"3xl"} textColor={"#009698"}> {`${formattedDate}`} </Flex>
                <Flex display={{ sm:"block", md:"flex"}}  mt={"20px"} textColor={"white"} gap={"5px"}>
                    <Flex w={{md:"50%", sm:"full"}} justifyContent={"center"}>
                        <Box w={"full"}>
                            <Flex justifyContent={"center"} w={"full"} bgColor={"#009698"} py={"10px"}>
                                Shift Pagi
                            </Flex>
                            <Box textColor={"gray.800"} px={"20px"}>
                                <Flex w={"full"} justifyContent={"center"} pt={"10px"} textColor={"gray.800"} px={"10px"}>
                                    <Box w={"full"}>
                                        {data?.map((item) => {
                                            return (
                                                <>
                                                    {item.shiftId === 1 ?
                                                        <Flex fontSize={"20px"} mb={"10px"} justifyContent={"center"} py={"5px"} borderColor={"gray.300"} borderBottom={"1px"} w={"full"} gap={"5px"}>
                                                            <Box> {item.user.name} </Box>
                                                            <Box>- {item.user.role.roleName} </Box>
                                                        </Flex>
                                                        :
                                                        null
                                                    }
                                                </>
                                            )
                                        })}
                                    </Box>
                                </Flex>
                            </Box>
                        </Box>
                    </Flex >
                    <Flex w={{md:"50%", sm:"full"}} justifyContent={"center"}>
                        <Box w={"full"}>
                            <Flex justifyContent={"center"} w={"full"} bgColor={"#009698"} py={"10px"}>
                                Shift Malam
                            </Flex>
                            <Flex justifyContent={"center"} pt={"10px"} textColor={"gray.800"} px={"20px"}>
                                <Box w={"full"}>
                                    {data?.map((item) => {
                                        return (
                                            <>
                                                {item.shiftId === 2 ?
                                                    <Flex fontSize={"20px"} mb={"10px"} justifyContent={"center"} py={"5px"} borderColor={"gray.300"} borderBottom={"1px"} w={"full"} gap={"5px"}>
                                                        <Box> {item.user.name} </Box>
                                                        <Box>- {item.user.role.roleName} </Box>
                                                    </Flex>
                                                    :
                                                    null
                                                }
                                            </>
                                        )
                                    })}
                                </Box>
                            </Flex>
                        </Box>
                    </Flex >
                </Flex>
            </Box>
        </Flex>
    )
}