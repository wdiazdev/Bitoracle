import { Route, Routes } from 'react-router-dom';
import './App.css'
import { NavBar } from './Components/NavBar';
import { LogIn } from './Pages/LogIn';
import Main from './Pages/Main';

function App() {

  return (
    <div className="App">

      <NavBar />

      <Routes>

        <Route index path='/' element={<Main />} />
        <Route index path='/login' element={<LogIn />} />
        <Route path='*' element={<p className='error'>404! Page not found!</p>} />

      </Routes>

    </div>
  )
}

export default App