import { useEffect, useState } from "react";


const CollegeCard = () => {
    const [colleges, setColleges] = useState([]);

    useEffect(()=> {
        fetch('colleges.json')
        .then(res => res.json())
        .then(data => setColleges(data))
    }, [])

    return (
        <div className="grid grid-cols-3 gap-5 my-20">
            {
                colleges.map((college, index) => 
                <div key={index} className="card card-compact w-100 bg-base-100 shadow-xl">
                <figure><img src= {college.college_image} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{college.college_name}</h2>
                    <p><span className="font-bold">Admission Data:</span> {college.admission_dates}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
            )
            }
        </div>
    );
};

export default CollegeCard;