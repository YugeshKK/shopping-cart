import {Routes,Route} from "react-router-dom"
import {Container} from 'react-bootstrap'
import {Home} from "./Pages/Home";
import {About} from './Pages/About';
import {Store}  from "./Pages/Store";
import {Navbar} from "./Components/Navbar";    
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";


function App() {
  return (
    <>
    <ShoppingCartProvider>
      <Navbar/>
    <Container>
      <Routes>
        <Route path='/'  element={<Store/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </Container>
   </ShoppingCartProvider>
   </>
  );
}

export default App;
