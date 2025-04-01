import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import Topbar from './components/topbar';
import Footer from './components/footer';
import ProductPage from './pages/product';
import StoreContextProvider from './context/useStore';
import ScrollToTop from './components/scrollToTop';

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop>
      <StoreContextProvider>
      <div className='md:text-[14px] text-[12px] md:leading-[20px] leading-[16px] tracking-[1.6%] '>
        <Topbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:title" element={<ProductPage />} />
        </Routes>
        <Footer />
      </div>
      </StoreContextProvider>
      </ScrollToTop>
    </BrowserRouter>
  )
}

export default App
