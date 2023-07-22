import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const CollegeDetails = () => {
    const id = useParams();
    const [college, setCollege] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/colleges/${id.id}`)
            .then(res => res.json())
            .then(data => setCollege(data))
    }, [id])
    console.log(college)

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl my-20">
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
                    <button className="btn btn-primary">Listen</button>
                </div>
            </div>
        </div>
    );
};

export default CollegeDetails;