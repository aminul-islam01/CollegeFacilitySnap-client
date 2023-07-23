import { useContext, useState } from 'react';
import { UserContext } from '../Providers/AuthProviders';
import Swal from 'sweetalert2'
// import useTitle from '../../hooks/useTitle';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
    // useTitle('Register');
    const { createUser, proFileUpdate } = useContext(UserContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [accept, setAccept] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (event) => {
        setError('');
        setSuccess('');
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 8) {
            setError("Password length must be at least 8 characters");
            return;
        } else if (password.length >= 15) {
            setError("Password length must not exceed 15 characters");
            return;
        } else if (!/(?=.*[A-Z])/.test(password)) {
            setError("Password must be at least one uppercase");
            return;
        } else if (!/(?=.*[@$!%#*?&])/.test(password)) {
            setError("Password must be at least one special characters");
            return;
        } else if (!/[0-9]/.test(password)) {
            setError("Password must be at least one number");
            return;
        }

        createUser(email, password)
            .then((result) => {
                const registerUser = result.user;

                proFileUpdate(registerUser, name, photo);

                setSuccess('user has been create successfully');
                form.reset();
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'user has been create successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log(registerUser)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleAccept = event => {
        const checked = event.target.checked;
        setAccept(checked);
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse mt-36">
                <div className="text-center lg:text-left md:w-1/2">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shadow-2xl bg-base-100 md:w-1/2">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type='text' name='name' placeholder="enter your name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type='email' name='email' placeholder="enter your email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type='text' name='photo' placeholder="enter your photo url" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" />
                                {showPassword ? <FaEye onClick={handleShowPassword} className='eye'></FaEye>
                                    : <FaEyeSlash onClick={handleShowPassword} className='eye'></FaEyeSlash>}
                                <p className='text-red-500'>{error}</p>
                                <p className='text-center mt-3 mb-5'>If you have an account? <Link to="/login">
                                    <button className='btn btn-neutral btn-xs'>Login</button>
                                </Link></p>
                            </div>
                                <label className="label cursor-pointer justify-start">
                                    <input onClick={handleAccept}  type="checkbox" className="checkbox me-3" />
                                    <span className="label-text">Accept Terms & Conditions</span>
                                </label>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary" disabled={!accept}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;