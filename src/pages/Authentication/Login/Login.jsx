import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { IoMdLogIn } from "react-icons/io";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const onSubmit = async (data) => {
        //console.log(data);
       await signIn(data.email, data.password)
        .then(result => {
            console.log(result.user);
            setUser(result.user);

            toast.success('Login successful');
            navigate(`${location?.state ? location.state : '/'}`);
        })
        .catch(error => {
            console.log(error)
            toast.error(error.message);
        })
    }

    return (
        <div>
            <title>TechLyst | Login</title>
            <div className='my-20'>
            <div className="flex flex-col mx-auto max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-100 dark:text-gray-800">
            <h1 className="my-3 text-4xl font-bold text-center">Log in</h1>
                
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                <label className="text-sm">Email address</label>
                <input type="email" 
                {...register('email', {required: true})} placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"/>
                {
                    errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                }
                    
                <label className="text-sm mt-2">Password</label>       
                <input type="password" 
                {...register('password', {
                    required: true,
                    minLength: 6
                })} 
                placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"/>
                {
                    errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                }
                {
                    errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must be 6 characters or longer</p>
                }
                <Link className="text-xs my-1 hover:underline dark:text-gray-600">Forgot password?</Link>
                <button type='submit' className="btn flex text-white bg-[#4dbbe8] w-full rounded-md">
                    <span>Login</span>
                    <span><IoMdLogIn size={20} /></span>
                </button>
            </form>
            <div className="space-y-2 mt-1">
                <SocialLogin/>
                <p className="px-6 text-sm text-center dark:text-gray-600">Don't have an account yet?
                <Link to='/register' className="hover:underline text-blue-400"> Sign up</Link>.
                </p>
            </div>
        </div>
        </div>
        </div>
    );
};

export default Login;