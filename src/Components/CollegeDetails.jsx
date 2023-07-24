import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";


const CollegeDetails = () => {
    const id = useParams();
    const [college, setCollege] = useState([]);
    const location = useLocation();

    const from = location.state?.from?.pathname;

    useEffect(() => {
        fetch(`http://localhost:5000/colleges/${id.id}`)
            .then(res => res.json())
            .then(data => setCollege(data))
    }, [id])
    console.log(college)
   
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl mt-32 mb-10">
            <figure><img src={college.college_image} /></figure>
            <div className="card-body">
                <h2 className="card-title">{college.college_name}</h2>
                <p>{college.research_history}</p>
                <>
                    <p className="text-xl font-semibold">Events:</p>
                    {
                        college?.events?.map((event, index) =>
                            <div key={index}>
                                <p>Name:{event.event_name}</p>
                                <p>Date:{event.event_date}</p>
                            </div>
                        )
                    }
                </>
                <>
                    <p className="text-xl font-semibold mt-5">Sports:</p>
                    {
                        college?.sports?.map((sport, index) =>
                            <ol key={index}>
                                <li>{index + 1}. {sport}</li>
                            </ol>
                        )
                    }
                </>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" disabled={from === '/my-college'}>
                        <Link to={`/admission-form/${college._id}`}>Admission</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CollegeDetails;