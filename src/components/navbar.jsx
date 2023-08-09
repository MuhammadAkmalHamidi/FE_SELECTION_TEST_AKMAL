import { Box, Button, Flex } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { BsFillPersonLinesFill } from 'react-icons/bs'
import { GiSandsOfTime } from 'react-icons/gi'
import { FaMoneyBillWaveAlt } from 'react-icons/fa'
import { AiOutlineClockCircle, AiOutlineHome } from 'react-icons/ai'
import { PiComputerTowerLight } from 'react-icons/pi'
import { useSelector } from "react-redux"
import { MonthSalary } from "./karyawan/gajiBulanan"

export const Navbar = () => {
    const user = useSelector((state) => state.user.value.isAdmin)
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    const home = () => {
        navigate('/absensi')
    }
    const riwayatAbsen = () => {
        navigate('/riwayatAbsensi')
    }
    const gajiBulanan = () => {
        navigate('/gajiPerBulan')
    }
    return (
        <Box boxShadow={"0px 0px 15px black"} position={"fixed"} w={{ base: "100px", sm: "120px", md: "150px", lg:"140px" }} h={"100vh"} bgGradient={"linear(to-b, #008b8b, #00cccc)"}>
            <Flex borderBottom={"2px solid white"} pb={"20px"} justify={"center"} fontSize={{ base: "20px", sm: "25px", md: "30px" }} fontWeight={"thin"} color={"white"} pt={"20px"} textShadow={"0px 0px 6px white"}>
                APPsensi
            </Flex>
            <Box color={"white"} mt={"30px"}>
                {user ?
                    (
                        <Box>
                            <Flex _hover={{ bgColor: "#008b8b" }} transition={"0.3s"} cursor={"pointer"} p={"10px"} color={"white"} alignItems={"center"} gap={"5"} mb={"100px"}>
                                <BsFillPersonLinesFill size={"50px"} color="white" />
                                <Flex>List Karyawan</Flex>
                            </Flex>
                            <Flex _hover={{ bgColor: "#008b8b" }} transition={"0.3s"} cursor={"pointer"} p={"10px"} color={"white"} alignItems={"center"} gap={"5"} mb={"100px"}>
                                <AiOutlineClockCircle size={"50px"} color="white" />
                                <Flex>Jam Kerja</Flex>
                            </Flex>
                            <Flex _hover={{ bgColor: "#008b8b" }} transition={"0.3s"} cursor={"pointer"} p={"10px"} color={"white"} alignItems={"center"} gap={"5"} mb={"100px"}>
                                <PiComputerTowerLight size={"50px"} color="white" />
                                <Flex>Divisi</Flex>
                            </Flex> </Box>
                    )
                    :
                    (
                        <Flex justifyContent={"center"}>
                            <Box>
                                <Box onClick={home} _hover={{ bgColor: "#008b8b" }} transition={"0.3s"} cursor={"pointer"} p={"10px"} color={"white"} alignItems={"center"} gap={"5"} mb={"50px"}>
                                    <Flex justifyContent={"center"}>
                                        <AiOutlineHome size={"50px"}  color="white" />
                                    </Flex>
                                    <Flex justifyContent={"center"} fontSize={{ base: "15px", sm: '20px', md: "20px" }}>Home</Flex>
                                </Box>
                                <Box onClick={gajiBulanan} _hover={{ bgColor: "#008b8b" }} transition={"0.3s"} cursor={"pointer"} p={"10px"} color={"white"} alignItems={"center"} gap={"5"} mb={"50px"}>
                                    <Flex justifyContent={"center"}>
                                        <FaMoneyBillWaveAlt size={"50px"}  color="white" />
                                    </Flex>
                                    <Flex justifyContent={"center"} fontSize={{ base: "15px", sm: '20px', md: "20px" }}>Gaji Bulanan</Flex>
                                </Box>
                                <Box onClick={riwayatAbsen} _hover={{ bgColor: "#008b8b" }} transition={"0.3s"} cursor={"pointer"} p={"10px"} color={"white"} alignItems={"center"} gap={"5"}>
                                    <Flex justifyContent={"center"}> <GiSandsOfTime size={"50px"} color="white" /> </Flex>
                                    <Flex textAlign={"center"} justifyContent={"center"} fontSize={{ base: "15px", sm: '20px', md: "20px" }}>Riwayat Absensi</Flex>
                                </Box>
                            </Box>
                        </Flex>
                    )
                }

                {user ? (<Flex justifyContent={"center"} mt={"160px"} >
                    <Button onClick={logOut} fontSize={"20px"} cursor={"pointer"} justifyContent={"center"} bgColor={"white"} boxShadow={"0px 0px 7px white"} color={"#009698"} fontWeight={"bold"} align={"center"} borderRadius={"15px"}>
                        Keluar
                    </Button>
                </Flex>) : (<Flex justifyContent={"center"} mt={{ base: "50px", sm: "70px", md: "100px", lg: "180px" }} >
                    <Button onClick={logOut} fontSize={"20px"} cursor={"pointer"} justifyContent={"center"} bgColor={"white"} boxShadow={"0px 0px 7px white"} color={"#009698"} fontWeight={"bold"} align={"center"} borderRadius={"15px"}>
                        Keluar
                    </Button>
                </Flex>)}

            </Box>
        </Box>
    )
}