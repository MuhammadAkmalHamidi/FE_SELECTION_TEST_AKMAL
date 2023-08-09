import { Box, Flex, Stack, Switch } from "@chakra-ui/react"
import { RiwayatAbsen } from "../components/karyawan/riwayatAbsen"
import { Navbar } from "../components/navbar"

export const AbsenKeseluruhan = () => {
    return (
        <Flex>
            <Box>
                <Navbar />
            </Box>
            <Flex w={"100%"} pl={{sm:"130px",lg:"130px"}} pt={"20px"}>
                <Box w={"100%"}>
                    <Flex justifyContent={"center"}>
                        <Flex fontSize={"30px"} color={"#009698"}>Riwayat Absensi</Flex>
                    </Flex>
                    <Box w={"100%"}>
                        <RiwayatAbsen />
                    </Box>
                </Box>
            </Flex>
        </Flex>
    )
}