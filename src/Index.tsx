import { Carousel } from "./nshared/Carousel"
import { Header } from "./shared/components/Header"
import { Navbar } from "./shared/components/Navbar"


export const Index = () => {
    return (
        <>  
        <Header />
        <Navbar 
        vcarrito={0}
        />
        <Carousel />
        
        </>
    )
        
}