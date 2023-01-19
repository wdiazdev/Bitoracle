// export const Dashboard = () => {

//     const [cryptoData, setCryptoData] = useState([]);

//     // const [asset, setAsset] = useState();

//     // const [addFormData, setAddFormData] = useState({
//     //     name: '',
//     //     quantity: ''
//     // });

//     const [filteredData, setFilteredData] = useState([]);

//     const [loading, setLoading] = useState(true);

//     const fetchCryptoData = () => {
//         axios.get(marketDataUrl)
//             .then(res => {
//                 // console.log(res.data)
//                 setCryptoData(res.data)
//             }).catch(err => {
//                 console.log(err)
//             })
//     };

//     useEffect(() => {
//         fetchCryptoData();
//     }, []);

//     //* LOADER

//     useEffect(() => {
//         setLoading(true)
//         setTimeout(() => {
//             setLoading(false)
//         }, 2000)
//     }, []);

//     //? Handle input filtered data / SearchBar component

//     const handleFilter = (event) => {
//         const searchCoin = event.target.value;
//         const newFilter = cryptoData.filter((coin) => {
//             return coin.name.toLowerCase().includes(searchCoin.toLowerCase()) ||
//                 coin.symbol.toLowerCase().includes(searchCoin.toLowerCase())
//         });
//         if (searchCoin === '') {
//             setFilteredData([]);
//         } else
//             setFilteredData(newFilter);
//     };

//     // //?  Handle Selected crypto / Search component data result

//     const handleSelect = (e) => {
//         e.preventDefault()
//         const selectedCoin = document.getElementById('asset').innerText;
//         if (selectedCoin === filteredData.name || filteredData.symbol) {
//             return setSelectedData(filteredData[0])
//         }
//         console.log(filteredData)
//     };

//     // const handleAddFormChange = (event) => {
//     //     event.preventDefault();

//     //     const fieldName = event.target.getAttribute('name');
//     //     const fieldValue = event.target.value;

//     //     const newFormData = { ...addFormData }
//     //     newFormData[fieldName] = fieldValue;
//     //     setAddFormData(newFormData);
//     // };

//     // const handleAddFormSubmit = (event) => {
//     //     event.preventDefault();

//     //     const newAsset = {
//     //         id: nanoid(),
//     //         name: addFormData.name,
//     //         quantity: addFormData.quantity
//     //     };

//     //     const newAssets = [...asset, newAsset];
//     //     setAsset(newAssets);
//     // };

//     return (
//         <>
//             {loading
//                 ?
//                 <Loader />
//                 :
//                 <div className='dashboard'>

//                     <div className='dash--container'>

//                         <h2>Dashboard</h2>

//                         <div className='dashboard--data'>

//                             <div className='search'>

//                                 <h4>Add an Asset:</h4>

//                                 <form
//                                 // onSubmit={handleAddFormSubmit}
//                                 >
//                                     <input
//                                         type='text'
//                                         name='name'
//                                         placeholder='Ex: Bitcoin, Ethereum...'
//                                         required='required'
//                                         autoComplete='off'
//                                         className='input--search'
//                                         onChange={handleFilter}
//                                     />

//                                     {/* <h4>Quantity:</h4>

//                                     <input
//                                         type='number'
//                                         name='quantity'
//                                         placeholder='Quantity'
//                                         required='required'
//                                         className='input--search'
//                                     onChange={handleAddFormChange}
//                                     />
//                                     <button type='submit'>Add</button> */}
//                                 </form>

//                                 {filteredData.length != 0 &&
//                                     <div className='filtered--container'>
//                                         {filteredData.slice(0, 2).map((coin) => {
//                                             return (
//                                                 <div
//                                                     key={coin.id}
//                                                     className='data--result'
//                                                     onClick={handleSelect}
//                                                 >
//                                                     <img src={coin.image} alt={coin.name} />
//                                                     <span
//                                                         id='asset'
//                                                     >
//                                                         {coin.name}
//                                                     </span>
//                                                 </div>
//                                             )
//                                         })}
//                                     </div>
//                                 }
//                             </div>

//                             <div className='portfolio--container'>

//                                 <h4>Balance: $300.00</h4>

//                                 <table className='dashboard--table'>
//                                     <thead>
//                                         <tr>
//                                             <th>Asset</th>
//                                             <th>price</th>
//                                             <th>Quantity</th>
//                                             <th>AVG. Buy Price</th>
//                                             <th>Holdings</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td>Osmosis</td>
//                                             <td>$0.98</td>
//                                             <td>900</td>
//                                             <td>$0.56</td>
//                                             <td>$500.00</td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             }
//         </>
//     )
// };