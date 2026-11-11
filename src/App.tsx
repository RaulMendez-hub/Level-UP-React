import { Catalogo } from "./views/Catalogo";
import { DetalleProducto } from "./views/DetalleProducto";
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
import { JuegosDeMesa } from "./views/JuegosDeMesa"
import { Carro } from "./views/Carro"
import { Tecnico } from "./views/Tecnico"
import { Perfil } from "./views/Perfil"
import { Registro } from "./views/Registro"
import { InicioSesion } from "./Components/nshared/InicioSesion"



export const App = () => {
    return (
        <>  
        <Header />
        <Navbar 
        vcarrito={0}
        placeholder="¿Qué estás buscando?"
        />
        <Routes>
            <Route path="/productos" element={<Catalogo />} />
            <Route path="/productos/:id" element={<DetalleProducto />} />
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/eventos" element={<Eventos></Eventos>}></Route>
            <Route path="/consolas" element={<Consolas></Consolas>}></Route>
            <Route path="/accesorios" element={<Accesorios></Accesorios>}></Route>
            <Route path="/computadores" element={<Computadores></Computadores>}></Route>
            <Route path="/sillas" element={<Sillas></Sillas>}></Route>
            <Route path="/merch" element={<Merch></Merch>}></Route>
            <Route path="/juegosMesa" element={<JuegosDeMesa></JuegosDeMesa>}></Route>
            <Route path="/Carro" element={<Carro></Carro>}></Route>
            <Route path="/tecnico" element={<Tecnico></Tecnico>}></Route>
            <Route path="/iniciarSesion" element={<InicioSesion></InicioSesion>}></Route>
            <Route path="/registro" element={<Registro></Registro>}></Route>
            <Route path="/perfil" element={<Perfil></Perfil>}></Route>
        </Routes>
        </>
    )
        
}