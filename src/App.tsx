import { Route, Routes } from "react-router-dom"
import { Header } from "./Components/shared/Header"
import { Navbar } from "./Components/shared/Navbar"
import { Eventos } from "./views/Eventos"
import { Home } from "./views/Home"
import { Consolas } from "./views/Consolas"
import { Accesorios } from "./views/Accesorios"
import { Computadores } from "./views/Computadores"
import { Sillas } from "./views/Sillas"
import { Merch } from "./views/Merch"




export const App = () => {
    return (
        <>  
        <Header />
        <Navbar 
        vcarrito={0}
        />
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/eventos" element={<Eventos></Eventos>}></Route>
            <Route path="/consolas" element={<Consolas></Consolas>}></Route>
            <Route path="/accesorios" element={<Accesorios></Accesorios>}></Route>
            <Route path="/computadores" element={<Computadores></Computadores>}></Route>
            <Route path="/sillas" element={<Sillas></Sillas>}></Route>
            <Route path="/merch" element={<Merch></Merch>}></Route>
        </Routes>
        </>
    )
        
}