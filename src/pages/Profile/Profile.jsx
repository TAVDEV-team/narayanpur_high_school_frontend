import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import API from "../../api/api";
import Loading from "../../components/Loading";
import PersonalInfo from "./Informations/PersonalInformations";
import DashboardItems from "./Dashboards/DashboardItems";

const AccountDashboard = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const accountId = localStorage.getItem("accountId");
  const role = localStorage.getItem("role");
  const accessToken = localStorage.getItem("accessToken");

  // 🔒 Guard
  useEffect(() => {
    if (!accessToken || !accountId || !role) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await API.get(`/user/account/${accountId}/`);
        setProfile(res.data);
      } catch (err) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, accountId, accessToken, role]);

  // 🚪 Logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await API.post("/user/logout/");
    } catch (_) {
      // ignore
    } finally {
      localStorage.clear();
      setIsLoggingOut(false);
      navigate("/login");
      localStorage.removeItem("accessToken");
      window.dispatchEvent(new Event("logout"));

      
    }
  };

  if (loading) return <Loading />;

  if (!profile)
    return (
      <p className="text-center text-red-600 mt-20">
        ❌ Profile not found
      </p>
    );

  return (
    <section className="bg-sky-100 min-h-screen flex mt-10">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-indigo-900 text-white shadow-xl flex-col py-10 mb-10">
        <nav className="px-6 space-y-3">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Dashboard
          </h2>

          <DashboardItems
            role={role}
            navigate={navigate}
            handleLogout={handleLogout}
            isLoggingOut={isLoggingOut}
          />
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1">
        {/* Mobile Topbar */}
        <div className="md:hidden flex justify-between p-4 bg-indigo-900 text-white">
          <button onClick={() => setSidebarOpen(true)}>
            <h1 className="font-bold text-lg">Dashboard</h1>
          </button>
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />

            <aside className="relative w-64 bg-indigo-900 text-white p-6 z-50">
              <button
                onClick={() => setSidebarOpen(false)}
                className="self-end mb-6"
              >
                <X className="w-6 h-6" />
              </button>

              <DashboardItems
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

        {/* Main */}
        <main className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
          <PersonalInfo account={profile} role={role} />
        </main>
      </div>
    </section>
  );
};

export default AccountDashboard;
