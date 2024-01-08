import React, { useEffect } from "react";
import AdminSidebar from "@/components/admin/admin-sidebar";
import useInactivityLogout from "@/hooks/useInactivityLogout"; // Import the hook

const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  useEffect(() => {
    document.dir = "rtl";
  });
  const { formattedTime, isWarning } = useInactivityLogout();

  return (
    <>
      <div className="bg-slate-200">
        <AdminSidebar />
        <p className={`fixed bottom-0 right-0 p-4 text-lg font-bold ${isWarning ? 'text-red-600' : 'text-black'} bg-opacity-75 bg-white`}>
          {formattedTime}
        </p>
      </div>
      <main className="flex-grow transition-all duration-300 ease-in-out bg-white p-8 shadow-lg">
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
