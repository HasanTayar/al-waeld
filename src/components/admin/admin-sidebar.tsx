import { RootState } from "@/store/store";
import {
  DatabaseZapIcon,
  UserIcon,
  SettingsIcon,
  Code2Icon,
  UserRoundCheck,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Use useNavigate hook
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { logoutUser } from "@/lib/services/supbase/auth/authServices";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.admin.userData);
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [roleClass, setRoleClass] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const toggleSheet = () => setIsSheetOpen(!isSheetOpen);

  const adminDashboardPath = `/admin-dashboard/?hashingcode=${import.meta.env.VITE_HASH}`;
  useEffect(() => {
    if (userData?.email.charAt(0) === "h") {
      setAdminName(`${import.meta.env.VITE_DEVELOPER_NAME}`);
      setAdminRole(`${import.meta.env.VITE_DEVELOPER_ROLE}`);
      setRoleClass("developer");
    } else {
      setAdminName(`${import.meta.env.VITE_ADMIN_NAME}`);
      setAdminRole(`${import.meta.env.VITE_ADMIN_ROLE}`);
      setRoleClass("owner");
    }
  }, [userData]);

  const handleAdminRouting = (link:string) => {
    const targetPath = link !== adminDashboardPath ? `${adminDashboardPath}/${link}` : adminDashboardPath;
    setIsSheetOpen(false);
    window.scrollTo(0, 0);
    navigate(targetPath);
  };

  const adminLinks = [
    { name: "ממשק ניהול", path: adminDashboardPath, icon: <DatabaseZapIcon /> },
    { name: "Users", path: "users", icon: <UserIcon /> },
    { name: "Settings", path: "settings", icon: <SettingsIcon /> },
    // Add more links as necessary
  ];
  const handleLogout = ()=>{
    logoutUser()
    navigate('/')
  }
  return (
    <>
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="m-4">
        <Button variant="outline" size="icon" className="bg-slate-300 hover:bg-slate-200" onClick={toggleSheet}>
          <Menu className="h-6 w-6 text-black" />
        </Button>
      </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-center">
              ממשק ניהול אשמין
            </SheetTitle>
            <SheetDescription className="flex flex-col items-start">
              <p className="text-lg text-black flex items-center">
                {roleClass === "developer" ? (
                  <Code2Icon className="ml-2" />
                ) : (
                  <UserRoundCheck className="ml-2" />
                )}
                {adminRole}
              </p>
              <p className="text-lg text-black">ברוך הבא, {adminName}</p>
            </SheetDescription>
          </SheetHeader>
          <div className="pt-10">
            {adminLinks.map((link, index) => (
              <div className="pt-2" key={index}>
                <Button variant='ghost' className="w-full flex justify-start" onClick={() => handleAdminRouting(link.path)}>
                  <span>{link.icon}</span>
                  <span className="pr-10 text-bold text-lg">{link.name}</span>
                </Button>
              </div>
            ))}
          </div>
        <SheetFooter>
          <Button variant='ghost' className="w-full" onClick={()=>handleLogout()}>
              יצאה
          </Button>
        </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminSidebar;
