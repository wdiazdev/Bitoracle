import { UserAuth } from '../Context/AuthContext';
import '../Styles/Account.css';
import { useNavigate } from 'react-router-dom';


export const Account = () => {

    const { user, logout } = UserAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/')
            console.log('Successfully logged out')
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className='account'>
            <h1>Account page</h1>
            <p>User Email: {user && user.email}</p>
            <button
                className='logout--btn'
                onClick={handleLogout}
            >Logout</button>
        </div>
    )
}


