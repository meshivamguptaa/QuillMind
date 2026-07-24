import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to={ROUTES.HOME}
          className="text-2xl font-bold text-indigo-500"
        >
          QuillMind
        </Link>

        <nav className="flex items-center gap-6">
          <Link to={ROUTES.HOME}>Home</Link>

          <Link to={ROUTES.BLOGS}>Blogs</Link>

          <Link to={ROUTES.LOGIN}>Login</Link>

          <Link to={ROUTES.REGISTER}>Register</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;