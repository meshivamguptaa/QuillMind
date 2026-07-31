import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogs } from "../../services/blogService";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res.blogs.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-6xl font-bold mb-6">
          AI-Powered Blogging{" "}
          <span className="text-indigo-500">Made Simple</span>
        </h1>

        <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-10">
          Create professional blogs in minutes using AI. Write, edit, manage,
          and publish beautifully formatted articles with QuillMind.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            Get Started
          </Link>

          <Link
            to="/blogs"
            className="border border-gray-500 hover:border-indigo-500 px-6 py-3 rounded-lg transition"
          >
            Explore Blogs
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mt-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose QuillMind?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">🤖 AI Writing</h3>
            <p className="text-gray-400">
              Generate complete blog articles from just a topic.
            </p>
          </div>

          <div className="border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">📝 Markdown</h3>
            <p className="text-gray-400">
              Write rich articles with Markdown support.
            </p>
          </div>

          <div className="border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">📊 Dashboard</h3>
            <p className="text-gray-400">
              Manage all your blogs from one clean dashboard.
            </p>
          </div>

          <div className="border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">🚀 SEO Ready</h3>
            <p className="text-gray-400">
              AI generates SEO title and description automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="mt-24">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Latest Blogs
        </h2>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-400">
            No blogs available yet.
          </p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="border border-gray-700 rounded-xl overflow-hidden hover:border-indigo-500 transition"
                >
                  {blog.coverImage && (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="h-52 w-full object-cover"
                    />
                  )}

                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-3">
                      {blog.title}
                    </h3>

                    <p className="text-gray-400 mb-5">
                      {blog.excerpt.length > 120
                        ? blog.excerpt.substring(0, 120) + "..."
                        : blog.excerpt}
                    </p>

                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="text-indigo-500 hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/blogs"
                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition"
              >
                View All Blogs
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;