import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Colleges = () => {
    const [colleges, setColleges] = useState([]);

    useEffect(()=> {
        fetch('http://localhost:5000/colleges')
        .then(res => res.json())
        .then(data => setColleges(data))
    }, [])

    return (
        <div className="grid grid-cols-3 gap-5 mt-36 mb-10">
            {
                colleges.map((college) => 
                <div key={college._id} className="card card-compact w-100 bg-base-100 shadow-xl">
                <figure><img src= {college.college_image} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{college.college_name}</h2>
                    <p><span className="font-bold">Admission Data:</span> {college.admission_dates}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/college-details/${college._id}`}><button className="btn btn-primary">Details</button></Link>
                    </div>
                </div>
            </div>
            )
            }
        </div>
    );
};

export default Colleges;