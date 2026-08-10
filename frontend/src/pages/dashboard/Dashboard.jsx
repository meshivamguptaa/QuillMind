import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getDashboard } from "../../services/dashboardService";
import { deleteBlog } from "../../services/blogService";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await deleteBlog(id);

      toast.success("Blog deleted successfully!");

      fetchDashboard();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete failed."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (!dashboard) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
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

        {dashboard.recentBlogs.length === 0 ? (
          <p className="text-gray-500">
            You haven't created any blogs yet.
          </p>
        ) : (
          dashboard.recentBlogs.map((blog) => (
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
                <Link
                  to={`/edit-blog/${blog._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(blog._id)}
                  disabled={deletingId === blog._id}
                  className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                >
                  {deletingId === blog._id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;