import { useEffect, useState } from "react";
import Axios from "axios";
import { Navbar } from "../navbar";
const { Box, Flex, Thead, Th, Table, Tbody, Td, Tr } = require("@chakra-ui/react");

export const MonthSalary = () => {

    const [data, setData] = useState([])
    const [reload, setReload] = useState(true)
    const [sort, setSort] = useState()
    const [sortBy, setSortBy] = useState()
    const token = localStorage.getItem('token')

    const history = async () => {
        try {
            const response = await Axios.post(`https://be-selection-test-akmal.vercel.app/salary/monthSalary?sortBy=${sortBy}&sort=${sort} `, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const rupiahFormat = new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: "IDR"
    })
    const rupiah = (value) => {
        return rupiahFormat.format(value)
    }

    useEffect(() => {
        history()
    }, [!reload])

    return (
        <Flex>
            <Navbar />
            <Box w={"100%"} pt={"30px"} pl={"130px"}>
                <Flex justifyContent={"center"}>
                    <Flex fontSize={"30px"} color={"#009698"}>Detail Gaji Bulanan</Flex>
                </Flex>
                
                <Table mt={"20px"} size={{ base: "md", sm: "md", md: "md", lg: "lg" }}>
                    <Thead bgGradient={"linear(to-r, #0abab5, #00ced1)"} >
                        <Th textShadow={"0px 0px 3px white"} fontSize={"20px"} color={"white"} fontWeight={"thin"} textAlign={"center"}>Tahun</Th>
                        <Th textShadow={"0px 0px 3px white"} fontSize={"20px"} color={"white"} fontWeight={"thin"} textAlign={"center"}>Bulan</Th>
                        <Th textShadow={"0px 0px 3px white"} fontSize={"20px"} color={"white"} fontWeight={"thin"} textAlign={"center"}>Total Gaji Bulanan</Th>
                    </Thead>
                    <Tbody>
                        {data?.map(item => {
                            return (
                                <Tr>
                                    <Td textAlign={"center"}> {item.year} </Td>
                                    <Td textAlign={"center"}> {item.month} </Td>
                                    <Td textAlign={"center"}> {rupiah(item.totalSalary)} </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    )
}