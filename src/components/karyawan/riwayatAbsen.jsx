import { useEffect, useState } from "react";
import  Axios  from "axios";

const { Box, Flex, Thead, Th, Table, Tbody, Td, Tr } = require("@chakra-ui/react");

export const RiwayatAbsen = () => {

    const [data , setData] = useState([])
    const [reload, setReload] = useState(false)
    const [sort, setSort] = useState("DESC")
    const [sortBy, setSortBy] = useState("createdAt")
    const token = localStorage.getItem('token')

    const history = async () => {

        try {
            const response = await Axios.get(`http://localhost:2000/absen/history?sortBy=${sortBy}&sort=${sort}`,{
                headers : { Authorization : `Bearer ${token}` }
            })
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const jam = new Date()

    const sortingTanggal = () => {
        setSort("ASC")
        setSortBy("clockOut")
        setReload(false)

        if (sort === "ASC") {
            setSort("DESC")
            setSortBy("clockOut")
            setReload(!reload)
        }
    }
    const sortingGaji = () => {
        setSort("ASC")
        setSortBy("dailySalary")
        setReload(false)

        if (sort === "ASC") {
            setSort("DESC")
            setSortBy("dailySalary")
            setReload(!reload)
        }
    }

    const rupiahFormat = new Intl.NumberFormat('id-ID',{
        style:"currency",
        currency : "IDR"
    })
    const rupiah = (value) => {
        return rupiahFormat.format(value)
    }

    useEffect(() => {
        history()
    }, [!reload])

    return (
        <Box w={"100%"} pt={"30px"}>
            <Table mt={"20px"} size={{base:"md", sm:"md", md:"md", lg:"lg"}}>
                <Thead bgGradient={"linear(to-r, #0abab5, #00ced1)"} >
                    <Th onClick={sortingTanggal} cursor={"pointer"} textShadow={"0px 0px 3px white"} fontSize={"20px"} color={"white"} fontWeight={"thin"} textAlign={"center"}>Tanggal</Th>
                    <Th textShadow={"0px 0px 3px white"} fontSize={"20px"} color={"white"} fontWeight={"thin"} textAlign={"center"}>Absen Masuk</Th>
                    <Th textShadow={"0px 0px 3px white"} fontSize={"20px"} color={"white"} fontWeight={"thin"} textAlign={"center"}>Absen Keluar</Th>
                    <Th textShadow={"0px 0px 3px white"} fontSize={"20px"} color={"white"} fontWeight={"thin"} textAlign={"center"}>Shift</Th>
                    <Th onClick={sortingGaji} cursor={"pointer"} textShadow={"0px 0px 3px white"} fontSize={"20px"} color={"white"} fontWeight={"thin"} textAlign={"center"}>Gaji Harian</Th>
                </Thead>
                <Tbody>
                    {data?.map(item => {
                        return(
                            <Tr>
                                <Td textAlign={"center"}> {new Date(item.createdAt).toLocaleDateString()} </Td>
                                <Td textAlign={"center"}> {item.clockIn ? new Date(new Date(item.clockIn) - (7 * 1000 * 60 * 60)).toLocaleTimeString("en-EN", {hour:"2-digit", minute:"2-digit"}) : "Belum Absen masuk"} </Td>
                                <Td textAlign={"center"}> {item.clockOut ? new Date(new Date(item.clockOut) - (7 * 1000 * 60 * 60)).toLocaleTimeString("en-EN", {hour:"2-digit", minute:"2-digit"}) : "Belum Absen Keluar"} </Td>
                                <Td textAlign={"center"}> {item.shiftId === 1 ? "Pagi" : "Malam"} </Td>
                                <Td textAlign={"center"}> {rupiah(item.dailySalary)} </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </Box>
    )
}