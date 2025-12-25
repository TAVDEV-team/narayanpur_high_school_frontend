import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import {
X
} from "lucide-react";
import API  from "../../api/api";
import { FetchProfessionalAccount } from "./FetchAccount";
import PersonalInfo from "./Informations/PersonalInformations";
import DashboardItems from "./Dashboards/DashboardItems";




{/* ---------------- DASHBOARD COMPONENT ---------------- */ }
const AccountDashboard = () => {
  const [account, setAccount] = useState(null);
  const [role, setRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  // 🔹 Fetch teacher profile
useEffect(() => {
  const fetchAccount = async () => {
    const accountId = localStorage.getItem("accountId");
    if (!accountId) {
      navigate("/login");
      return;
    }

    try {
      const { account, role } = await FetchProfessionalAccount(accountId);  
      setAccount(account);
      setRole(role);
    } catch (err) {
      setAccount(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  fetchAccount();
}, [navigate]);

  
  // 🔹 Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/user/logout/",
        {headers: { Authorization: `Token ${token}` } }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.clear();
      setIsLoggingOut(false);
      navigate("/login");
    }
  };

  if (loading)
    return (
      <Loading/>
    );
  if (!account)
    return (
      <p className="text-center text-red-600 mt-20">❌ profile not found</p>
    );

  return (
    <section className="bg-sky-100 min-h-screen flex mt-10">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-indigo-900 text-white shadow-xl flex-col py-10 mb-10">
        <div className="px-6">
          <nav className="space-y-3">
            <h2 className="text-2xl font-bold tracking-wide mb-8 text-center">
              Dashboard
            </h2>

            <DashboardItems
              account={account}
              role={role}
              navigate={navigate}
              handleLogout={handleLogout}
              isLoggingOut={isLoggingOut}
            />
          </nav>
        </div>
      </aside>

      {/* Right Content (Mobile + Main) */}
      <div className="flex-1">
        {/* Mobile Topbar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-indigo-900 text-white shadow py-8">
          <button onClick={() => setSidebarOpen(true)}>
            <h1 className="font-bold text-lg">Dashboard</h1>
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Background overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar itself */}
            <aside className="relative w-64 bg-indigo-900 text-white p-6 flex flex-col z-50">
              {/* Close button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="self-end mb-6"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Reuse the same dashboard items */}
              <DashboardItems
                account={account}
                role={role}
                navigate={(path) => {
                  setSidebarOpen(false);
                  navigate(path);
                }}
                handleLogout={handleLogout}
                isLoggingOut={isLoggingOut}
              />
            </aside>
          </div>
        )}

        {/* Main dashboard */}
        <main className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
          <PersonalInfo account={account.account} />
        </main>
      </div>
    </section>
  );
};



export default AccountDashboard;
