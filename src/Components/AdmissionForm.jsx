import { useContext } from "react";
import { useForm } from "react-hook-form"
import { UserContext } from "../Providers/AuthProviders";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AdmissionForm = () => {
    const { user } = useContext(UserContext);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm()
    const collegeId = useParams();

    const onSubmit = (data) => {
        data.collegeId = collegeId.id;
        console.log(data)
        fetch('http://localhost:5000/admission', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Submit successfully',
                    showConfirmbutton: false,
                    timer: 1500
                })
            }
        })
        reset()
    }

    return (
        <div className="hero min-h-screen bg-base-200 mt-36">
            <div className="card w-full shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" className="input input-bordered" {...register("name", { required: true })} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Subject</span>
                            </label>
                            <input type="text" placeholder="Subject" className="input input-bordered" {...register("subject", { required: true })} />
                        </div>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" defaultValue={user?.email} readOnly className="input input-bordered" {...register("email", { required: true })} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="number" placeholder="Phone Number" className="input input-bordered" {...register("phone_number", { required: true })} />
                        </div>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text" placeholder="Address" className="input input-bordered" {...register("address", { required: true })} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date of Birth</span>
                            </label>
                            <input type="date" placeholder="Date of Birth" className="input input-bordered" {...register("DoB", { required: true })} />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="text" placeholder="Image" className="input input-bordered" {...register("image", { required: true })} />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdmissionForm;