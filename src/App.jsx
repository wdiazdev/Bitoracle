import { Route, Routes } from 'react-router-dom';
import './App.css'
import { NavBar } from './Components/NavBar';
import { SignUp } from './Pages/SignUp';
import Main from './Pages/Main';

function App() {

  return (
    <div className="App">

      <NavBar />

      <Routes>

        <Route index path='/' element={<Main />} />
        <Route index path='/signup' element={<SignUp />} />
        <Route path='*' element={<p className='error'>404! Page not found!</p>} />

      </Routes>

    </div>
  )
}

export default App