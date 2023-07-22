import { useEffect } from "react";


const CollegeDetails = () => {

    useEffect(() => {
        fetch('colleges.json')
            .then(res => res.json())
            .then(data => console.log(data))
    }, [])

    return (
        <div>
            <h2>ho</h2>
        </div>
    );
};

export default CollegeDetails;