import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const userData = useSelector((state: RootState) => state.admin.userData);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Set admin name based on the email or other logic
    if (userData?.user.email.charAt(0) === 'h') {
      setAdminName('hasan');
    } else {
      // Set default name or perform other checks
      setAdminName('Admin');
    }
  }, [userData]);

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Settings', path: '/admin/settings' },
    // Add more links as necessary
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="flex flex-col p-4">
        <span className="text-lg font-bold mb-4">ניהול האתר</span>
        <span className="text-lg font-bold mb-4">ברוך הבא {adminName}</span>
        {adminLinks.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive ? 'text-blue-500' : 'text-gray-300'
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
