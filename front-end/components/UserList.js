import { useEffect } from 'react';
import useAdminStore from '../store/adminStore';

const UserList = () => {
  const { users, fetchUsers } = useAdminStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-xl mb-4">User Management</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="border-b py-2">
            {user.username} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;