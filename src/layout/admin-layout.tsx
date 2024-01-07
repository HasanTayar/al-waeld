import React from 'react';
import AdminSidebar from '@/components/admin/admin-sidebar';
import useInactivityLogout from '@/hooks/useInactivityLogout'; // Import the hook

const AdminLayout = ({ children }:{ children?: React.ReactNode }) => {
  useInactivityLogout(); 
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-grow bg-slate-300 p-4">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
