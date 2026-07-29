import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../../services/dashboardService";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) return <h1>Loading...</h1>;

  return (
    <div className="p-8">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your blogs
          </p>
        </div>

        <Link
          to="/create-blog"
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Create Blog
        </Link>

      </div>

      <div className="grid grid-cols-3 gap-6 mt-10">

        <div className="border rounded p-5">
          <h3>Total Blogs</h3>
          <p className="text-3xl font-bold">
            {dashboard.stats.total}
          </p>
        </div>

        <div className="border rounded p-5">
          <h3>Published</h3>
          <p className="text-3xl font-bold">
            {dashboard.stats.published}
          </p>
        </div>

        <div className="border rounded p-5">
          <h3>Drafts</h3>
          <p className="text-3xl font-bold">
            {dashboard.stats.drafts}
          </p>
        </div>

      </div>

      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-5">
          Recent Blogs
        </h2>

        {dashboard.recentBlogs.map((blog) => (
          <div
            key={blog._id}
            className="border rounded p-5 mb-4 flex justify-between"
          >
            <div>
              <h3 className="font-semibold">
                {blog.title}
              </h3>

              <p>{blog.status}</p>
            </div>

            <div className="space-x-3">

              <Link to={`/edit-blog/${blog._id}`}>
                Edit
              </Link>

              <button>
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Dashboard;