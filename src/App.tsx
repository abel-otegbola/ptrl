import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import Topbar from './components/topbar';
import Footer from './components/footer';
import ProductPage from './pages/product';
import StoreContextProvider from './context/useStore';

function App() {

  return (
    <BrowserRouter>
      <StoreContextProvider>
      <div className='2xl:text-[32px] md:text-[24px] text-[16px] md:leading-[36px] leading-[24px] tracking-[1%] '>
        <Topbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:title" element={<ProductPage />} />
        </Routes>
        <Footer />
      </div>
      </StoreContextProvider>
    </BrowserRouter>
  )
}

export default App
