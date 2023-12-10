import { useEffect } from "react";
import { Absen } from "./pages/absen";
import { ListKaryawan } from "./pages/admin";
import { Login } from "./pages/login";
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setValue } from "./redux/userSlice";
import  Axios  from "axios";
import { CreateAccount } from "./pages/createAccount";
import { AbsenKeseluruhan } from "./pages/detailRiwayatAbsen";
import { MonthSalary } from "./components/karyawan/gajiBulanan";
import { Jadwal } from "./pages/jadwal";
import { JadwalKerjaAdmin } from "./pages/jadwalKerjaAdmin";

const router = createBrowserRouter([
  {path: "/", element: <Login />},
  {path: "/absensi", element: <Absen />},
  {path: "/listKaryawan", element: <ListKaryawan />},
  {path: "/akunBaru", element: <CreateAccount />},
  {path: "/riwayatAbsensi", element: <AbsenKeseluruhan />},
  {path: "/gajiPerBulan", element: <MonthSalary />},
  {path: "/jadwal", element: <Jadwal />},
  {path: "/jadwalAdmin", element: <JadwalKerjaAdmin />},
  
])

function App() {

  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  const keepLogin = async () => {
    try {
      const response = await Axios.get(`https://be-selection-test-akmal.vercel.app/user/keepLogin`, {
        headers:  {Authorization: `Bearer ${token}`}
      })
      dispatch(setValue(response.data));

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    keepLogin()
  })
  return (
    <div className="App">
      <RouterProvider router={router} >

      </RouterProvider>
    </div>
  );
}

export default App;
