import { FaSearch } from 'react-icons/fa';
import '../Styles/SearchInput.css';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const SearchInput = ({ setSearch }) => {


    return (
        <div className='search--bar--container'>
            <div className='search--input'>
                <input
                    type='text'
                    placeholder='Search here...'
                    onChange={e => setSearch(e.target.value.toLowerCase())

                    }
                />
                <div className='icon'><FaSearch /></div>
            </div>
        </div>
    )
}

export default SearchInput
