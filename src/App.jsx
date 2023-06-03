import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout_page from './Pages/Layout_page'
import Main_page from './Pages/Main_page'
import AdminPage from './Pages/AdminPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout_page><Main_page /></Layout_page>}></Route>
          <Route path='/admin' element={<Layout_page><AdminPage /></Layout_page>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
