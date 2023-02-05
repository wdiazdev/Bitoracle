import './App.css'
import { Route, Routes } from 'react-router-dom';
import { NavBar } from './Components/NavBar';
import { SignUp } from './Pages/SignUp';
import { Dashboard } from './Pages/Dashboard';
import { SignIn } from './Pages/SignIn';
import { Home } from './Pages/Home';
import ProtectedRoute from './Components/ProtectedRoute';
import { ForgotPassword } from './Pages/ForgotPassword';
import { Error404 } from './Components/Error404';
import { CoinPage } from './Pages/CoinPage';

function App() {
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