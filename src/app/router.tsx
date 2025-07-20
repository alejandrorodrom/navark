import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../modules/home/views/Home'
import LoaderOverlay from "../shared/loading/LoaderOverlay.tsx";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home/> }/>
        </Routes>
      </BrowserRouter>
      <LoaderOverlay/>
    </>
  )
}
