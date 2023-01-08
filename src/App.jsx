import { Route, Routes } from 'react-router-dom';
import './App.css'
import { NavBar } from './Components/NavBar';
import { SignUp } from './Pages/SignUp';
import { Account } from './Pages/Account';
import { SignIn } from './Pages/SignIn';
import { Home } from './Pages/Home';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {

  return (
    <div className="App">

      <NavBar />

      <Routes>

        <Route index path='/' element={<Home />} />
        <Route index path='/signin' element={<SignIn />} />
        <Route index path='/signup' element={<SignUp />} />
        //! protected route
        <Route index path='/account' element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } />

        <Route path='*' element={<p className='error'>404! Page not found!</p>} />

      </Routes>

    </div>
  )
}

export default App