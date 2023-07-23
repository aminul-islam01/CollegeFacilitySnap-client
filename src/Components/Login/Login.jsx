import { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Providers/AuthProviders';
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2'
// import useTitle from '../../hooks/useTitle';

const Login = () => {
    // useTitle('Login');
    const { loginUser, handleGoogleSignIn, handleGithubSignIn, handleResetPassword } = useContext(UserContext);
    const Navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // console.log(location)
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        loginUser(email, password)
            .then((result) => {
                const loggedUser = result.user;
                form.reset();
                Navigate(from, { replace: true });
                Swal.fire({
                    icon: 'success',
                    title: 'Login successfull',
                    showConfirmbutton: false,
                    timer: 1500
                })
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            });

    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
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
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type='email' name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" />
                                {showPassword ? <FaEye onClick={handleShowPassword} className='eye'></FaEye>
                                    : <FaEyeSlash onClick={handleShowPassword} className='eye'></FaEyeSlash>}
                                <p className='text-red-500'>{error}</p>
                                <label className="label">
                                    <a onClick={handleResetPassword} className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                <p className='text-center mt-3 mb-5'>Don not have an account? <Link to="/register">
                                <button className='btn btn-neutral btn-xs'>Register</button>
                                </Link></p>
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <button onClick={()=>handleGoogleSignIn(from, Navigate)} className='btn btn-outline btn-info'>
                        <FaGoogle></FaGoogle> Login With Google</button>

                        <button onClick={()=>handleGithubSignIn(from, Navigate)} className='btn btn-outline'>
                        <FaGithub></FaGithub> Login With Github</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;