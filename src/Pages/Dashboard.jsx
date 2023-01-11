import { UserAuth } from '../Context/AuthContext';
import '../Styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../Components/Loader';


export const Dashboard = () => {

    const [error, setError] = useState();

    const [loading, setLoading] = useState(true);

    const { user, logout } = UserAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        setError('')
        try {
            await logout();
            navigate('/')
            console.log('Successfully logged out')
        } catch (e) {
            setError('Failed to log out')
            console.log(e.message)
        }
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)

    }, []);

    return (

        <>
            {loading
                ?
                <Loader />
                :
                <div className='dashboard'>

                    <div className='dash--nav'>
                        <p>Welcome: {user && user.email}</p>

                        <button
                            className='dash--btn'
                            onClick={handleLogout}
                        >Logout</button>

                        {error && <p className='signup--error'>{error}</p>}
                    </div>

                    <div className='dash--container'>

                        <h2>Dashboard</h2>

                    </div>
                </div>

            }
        </>
    )
};


