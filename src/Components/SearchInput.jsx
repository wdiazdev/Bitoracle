import '../Styles/SearchInput.css';

const SearchInput = ({ setSearch }) => {


    return (
        <div className='search--bar--container'>
            <div className='input--container'>
                <input
                    type='text'
                    onChange={e => setSearch(e.target.value.toLowerCase())
                    }
                />
                <span>Search for you crypto!</span>
            </div>
        </div>
    )
}

export default SearchInput