import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../../../hooks/useAxios';

const SocialLogin = () => {
    const {googleSignIn,setUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosInstance = useAxios();
    const handleGoogleLogin = async () =>{
       await googleSignIn()
        .then(async(result) => {
            const user = result.user;
            // user update in database
            const userInfo = {
                name: user.displayName,
                email: user.email,
                role: 'user', 
                subscribed: false, 
                createdAt: new Date().toISOString()
            };

            const userRes = await axiosInstance.post('/users',userInfo);
            console.log(userRes.data);

            setUser(result.user);

            toast.success('Login successful');
            navigate(`${location?.state ? location.state : '/'}`);
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
                <button onClick={handleGoogleLogin} className="btn w-full text-white bg-[#4dbbe8]">
                <FcGoogle size={20}/> Login with Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;