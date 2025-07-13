import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const SocialLogin = () => {
    const {googleSignIn,setUser} = useAuth();
    const navigate = useNavigate();
    const handleGoogleLogin = () =>{
        googleSignIn().then(result=>{
            setUser(result.user);
            navigate('/');
            toast.success('Login successful');
        })
        .catch(error=>{
            console.log(error);
            toast.error(error.message);
        })
    }
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center w-full my-1">
                <hr className="w-full dark:text-gray-600" />
                <p className="px-3 dark:text-gray-600">OR</p>
                <hr className="w-full dark:text-gray-600" />
            </div>
            <div>
                <button onClick={handleGoogleLogin} className="btn w-full bg-primary text-white border-[#e5e5e5]">
                <FcGoogle size={20}/> Login with Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;