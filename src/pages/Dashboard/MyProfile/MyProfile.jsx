import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Loading from '../../../components/Shared/Loading/Loading'


const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: dbUser = {}, isLoading } = useQuery({
    queryKey: ['userProfile', user?.email],
    enabled: !!user?.email,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    }
  });

  const handleSubscribe = () => {
    navigate('/dashboard/payment');
  };

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col justify-center max-w-xs mx-auto p-6 shadow-lg rounded-xl sm:px-12 bg-base-200 text-base-content">
        <img
          src={user?.photoURL || 'https://img.icons8.com/ios-glyphs/30/user--v1.png'}
          alt="User"
          className="w-32 h-32 mx-auto rounded-full bg-gray-300 aspect-square"
        />
        <div className="space-y-4 text-center divide-y divide-base-300">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">{user?.displayName}</h2>
            <p className="px-5 text-xs sm:text-base text-gray-500">{user?.email}</p>
          </div>

          <div className="pt-4">
            {!dbUser?.subscribed ? (
              <button onClick={handleSubscribe} className="btn btn-primary w-full">
                Subscribe - $5/month
              </button>
            ) : (
              <button className="badge badge-success text-white px-4 py-2 mt-2 text-sm">
                Membership Status: Verified
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default MyProfile;
