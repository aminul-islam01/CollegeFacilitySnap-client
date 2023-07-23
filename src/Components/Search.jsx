import { useNavigate } from "react-router-dom";


const Search = () => {
    const navigate = useNavigate();

    const showCollageDetails = (id) => {
        navigate(`/college-details/${id}`)
    }

    const handleSearch = even => {
        even.preventDefault();
        const form = even.target;
        const text = form.searchText.value;

        fetch(`http://localhost:5000/college?search=${text}`)
        .then(res => res.json())
        .then(data => {
            console.log(data._id)
            showCollageDetails(data._id)
        })
        
    }


    return (
        <div className="mx-auto bg-black text-center p-3 bg-opacity-50">
            <div className="form-control inline-block">
                <form onSubmit={handleSearch} className="input-group">
                    <input type="text" name="searchText" placeholder="Search…" className="input input-bordered" />
                    <button className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Search;