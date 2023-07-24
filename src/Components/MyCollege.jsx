import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Providers/AuthProviders";
import { Link, useLocation } from "react-router-dom";


const MyCollege = () => {
    const { user } = useContext(UserContext);
    const [colleges, setColleges] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetch(`https://college-facility-snap-server.vercel.app/my-college/${user?.email}`)
            .then(res => res.json())
            .then(data => setColleges(data))
    }, [user])

    return (
        <div className="grid grid-cols-3 gap-5 mt-36">
            {
                colleges.map((college) =>
                    <div key={college._id} className="card card-compact w-100 bg-base-100 shadow-xl">
                        <figure><img src={college.college_image} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{college.college_name}</h2>
                            <p><span className="font-bold">Admission Data:</span> {college.admission_dates}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/college-details/${college._id}`} state={{ from: location }} replace><button className="btn btn-primary">Details</button></Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default MyCollege;