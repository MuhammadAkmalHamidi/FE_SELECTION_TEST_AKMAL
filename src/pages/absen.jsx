import { Box, Button, Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Jam } from "../components/jam"
import { Navbar } from "../components/navbar"
import { useNavigate } from "react-router-dom"
import Axios from "axios"

export const Absen = () => {
    const toast = useToast()
    const [checkShift, setCheckShift] = useState(0)
    const [shift, setShift] = useState(2)
    const token = localStorage.getItem('token')

    const jam = new Date().getHours()

    const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);
    }
    const navigate = useNavigate()

    const getShift = async () => {
        try {
            const response = await Axios.get('https://be-selection-test-akmal.vercel.app//jadwal/check', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setCheckShift(response.data.shiftId)
        } catch (error) {
            console.log(error);
        }
    }

    console.log(shift);
    console.log(checkShift);

    const clockIn = async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(latitude);
                console.log(longitude);

                const targetLatitude = -6.92259
                const targetLongitude = 107.682813

                const earthRadius = 6371;  // Radius Bumi dalam kilometer
                const dLat = toRadians(targetLatitude - latitude);
                const dLon = toRadians(targetLongitude - longitude);

                const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(toRadians(latitude)) * Math.cos(toRadians(targetLatitude)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = earthRadius * c * 1000;  // Dalam meter
                if (distance < 25) {

                    try {
                        const response = await Axios.post(`https://be-selection-test-akmal.vercel.app//absen/clockIn?shiftId=${shift}`, {}, {
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
                else {
                    toast({
                        title: "Maaf",
                        description: "Lokasi anda di luar jarak akses",
                        status: "error",
                        duration: 1000,
                        isClosable: true,
                        position: "top"

                    })
                }
            }, function (error) {
                console.error("Kesalahan lokasi:", error);
            });
        } else {
            alert("Lokasi tidak didukung di peramban ini.");
        }
    }
    const clockOut = async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const targetLatitude = -6.92259
                const targetLongitude = 107.682813

                const earthRadius = 6371;  // Radius Bumi dalam kilometer
                const dLat = toRadians(targetLatitude - latitude);
                const dLon = toRadians(targetLongitude - longitude);

                const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(toRadians(latitude)) * Math.cos(toRadians(targetLatitude)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = earthRadius * c * 1000;  // Dalam meter
                if (distance < 10) {
                    try {
                        const response = await Axios.post(`https://be-selection-test-akmal.vercel.app//absen/clockOut?shiftId=${shift}`, {}, {
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
                else {
                    toast({
                        title: "Maaf",
                        description: "Lokasi anda di luar jarak akses",
                        status: "error",
                        duration: 1000,
                        isClosable: true,
                        position: "top"

                    })
                }
            }, function (error) {
                console.error("Kesalahan lokasi:", error);
            });
        } else {
            alert("Lokasi tidak didukung di peramban ini.");
        }
    }


    useEffect(() => {
        if (!token) {
            navigate('/')
        }
        if (checkShift === 1) {
            setShift(1)
        }
        else if (checkShift === 2) {
            setShift(2)
        }
        getShift()
    }, [checkShift])
    return (
        <Flex w="100%" h={"100%"}>
            <Flex w="100%" h={"100%"}>
                <Flex position="fixed" zIndex="10">
                    <Navbar />
                </Flex>
                <Box pl={{ base: "100px" }} bgRepeat={"none"} w="100%" h={"100vh"} bgImage="url('https://wallpaperaccess.com/full/4527176.jpg')" bgSize="cover">
                    <Flex position="relative" justifyContent="center" pt="100px">
                        <Box bgColor="rgba(255,255,255,0.5)" p={"5px"} w={{ base: "250px", sm: "270px", md: "300px", lg: "400px" }} borderRadius="20px" boxShadow="0px 0px 15px gray">
                            <Flex h={{ base: "100px", sm: "120px", md: "140px", lg: "200px" }} justifyContent="center" lineHeight="150px"> <Jam /> </Flex>
                            <Flex justifyContent="space-evenly" hidden={shift === 1 ? false : true}>
                                {parseInt(jam) < 6 || parseInt(jam) >= 10 ? (<Button isDisabled={true} _active={{ bgColor: "#0abab5" }} boxShadow={"0px 0px 5px gray"} _hover={{ bgClip: "#0abab5" }} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Masuk</Button>) : (<Button boxShadow={"0px 0px 5px gray"} onClick={clockIn} _hover={{ boxShadow: "0px 0px 10px #0abab5" }} transition={"0.3s"} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Masuk</Button>)}
                                {/* <Button boxShadow={"0px 0px 5px gray"} onClick={clockIn} _hover={{ boxShadow: "0px 0px 10px #0abab5" }} transition={"0.3s"} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Masuk</Button> */}
                                {parseInt(jam) < 18 || parseInt(jam) >= 21 ? (<Button isDisabled={true} boxShadow={"0px 0px 5px gray"} _hover={{ bgColor: "#0abab5" }} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Keluar</Button>) : (<Button boxShadow={"0px 0px 5px gray"} onClick={clockOut} _hover={{ boxShadow: "0px 0px 10px #0abab5" }} transition={"0.3s"} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Keluar</Button>)}
                                {/* <Button boxShadow={"0px 0px 5px gray"} onClick={clockOut} _hover={{ boxShadow: "0px 0px 10px #0abab5" }} transition={"0.3s"} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Keluar</Button> */}
                            </Flex>
                            <Flex justifyContent="space-evenly" hidden={shift === 2? false : true}>
                                {parseInt(jam) < 11 || parseInt(jam) >= 15 ? (<Button isDisabled={true} _active={{ bgColor: "#0abab5" }} boxShadow={"0px 0px 5px gray"} _hover={{ bgClip: "#0abab5" }} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Masuk</Button>) : (<Button boxShadow={"0px 0px 5px gray"} onClick={clockIn} _hover={{ boxShadow: "0px 0px 10px #0abab5" }} transition={"0.3s"} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Masuk</Button>)}
                                {/* <Button boxShadow={"0px 0px 5px gray"} onClick={clockIn} _hover={{ boxShadow: "0px 0px 10px #0abab5" }} transition={"0.3s"} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Masuk</Button> */}
                                {parseInt(jam) < 21 || parseInt(jam) >= 0 ? (<Button isDisabled={true} boxShadow={"0px 0px 5px gray"} _hover={{ bgColor: "#0abab5" }} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Keluar</Button>) : (<Button boxShadow={"0px 0px 5px gray"} onClick={clockOut} _hover={{ boxShadow: "0px 0px 10px #0abab5" }} transition={"0.3s"} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Keluar</Button>)}
                                {/* <Button boxShadow={"0px 0px 5px gray"} onClick={clockOut} _hover={{ boxShadow: "0px 0px 10px #0abab5" }} transition={"0.3s"} bgColor={"#0abab5"} p={"10px"} borderRadius={"15px"} color={"white"} fontWeight={"thin"}>Absen Keluar</Button> */}
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    )
}