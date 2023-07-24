import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Admission = () => {
    const [admissions, setAdmissions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/admission')
            .then(res => res.json())
            .then(data => setAdmissions(data))
    }, [])

    console.log(admissions)
    return (
        <div className="overflow-x-auto mt-36 mb-10">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="bg-base-200">
                        <th>#</th>
                        <th>College Image</th>
                        <th>College Name</th>
                        <th>Admission Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {admissions.map((admission, index) =>
                        <tr key={admission.collegeId}>
                            <th>{index+1}</th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-16 h-16">
                                        <img src={admission.collegeImage} />
                                    </div>
                                </div>
                            </td>
                            <td>{admission.collegeName}</td>
                            <td>{admission.AdmissionDate}</td>
                            <th>
                                <button className="btn btn-primary btn-xs"><Link to={`/admission-form/${admission.collegeId}`}>
                                Admission</Link></button>
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Admission;