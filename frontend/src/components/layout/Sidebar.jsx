import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-3xl font-bold text-indigo-500 mb-10">
        QuillMind
      </h1>

      <nav className="flex flex-col gap-5">
        <Link
          to={ROUTES.DASHBOARD}
          className="hover:text-indigo-400"
        >
          Dashboard
        </Link>

        <Link
          to={ROUTES.CREATE_BLOG}
          className="hover:text-indigo-400"
        >
          Create Blog
        </Link>

        <Link
          to={ROUTES.BLOGS}
          className="hover:text-indigo-400"
        >
          Public Blogs
        </Link>

        <button
          onClick={handleLogout}
          className="text-left text-red-400 hover:text-red-500"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;