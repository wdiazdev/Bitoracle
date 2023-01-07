import '../Styles/Pagination.css';

const Pagination = ({ coinsPerPage, totalCoins, setCurrentPage }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className='pagination'>
            {
                pages.map((page, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default Pagination;