import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const { mutateAsync: updateRole, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, newRole }) => {
      const res = await axiosSecure.patch(`/users/${id}/role`, { newRole });
      return res.data;
    },
    onSuccess: (data, variables) => {
      Swal.fire('Success!', `User is now a ${variables.newRole}.`, 'success');
      refetch();
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update user role', 'error');
    },
  });


  const handleMakeRole = async (id, role) => {
    const confirm = await Swal.fire({
      title: `Make this user ${role}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, make ${role}`,
    });

    if (confirm.isConfirmed) {
      await updateRole({ id, newRole: role });
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading users...</div>;
  }

  return (
    <div className="overflow-x-auto w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200 text-base font-semibold">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Make Moderator</th>
            <th>Make Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>{idx + 1}</td>
              <td>{user.name || 'N/A'}</td>
              <td>{user.email}</td>
              <td className="capitalize">{user.role || 'user'}</td>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  disabled={user.role === 'moderator' || isUpdating}
                  onClick={() => handleMakeRole(user._id, 'moderator')}
                >
                  Make Moderator
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-success"
                  disabled={user.role === 'admin' || isUpdating}
                  onClick={() => handleMakeRole(user._id, 'admin')}
                >
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
