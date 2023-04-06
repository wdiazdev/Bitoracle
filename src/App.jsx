import { useEffect } from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { NavBar } from './Components/NavBar';
import { Home, CoinPage, SignIn, SignUp, ForgotPassword, Dashboard } from './Pages/index';
import ProtectedRoute from './Components/ProtectedRoute';
import { Error404 } from './Components/Error404';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route exact path='/coin/:id' element={<CoinPage />} />
        <Route exact path='/signin' element={<SignIn />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/forgot-password' element={<ForgotPassword />} />
        //! protected route
        <Route exact path='/account' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='*' element={<Error404 />}
        />
      </Routes>
    </div>
  )
};

export default App