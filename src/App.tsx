import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import Topbar from './components/topbar';
import Footer from './components/footer';

function App() {

  return (
    <BrowserRouter>
      <div className='md:text-[24px] text-[16px] md:leading-[36px] leading-[24px] tracking-[1%] '>
        <Topbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
