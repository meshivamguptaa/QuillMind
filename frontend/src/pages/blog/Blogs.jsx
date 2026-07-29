import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../../services/blogService";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await getBlogs();
      setBlogs(data.blogs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        All Blogs
      </h1>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border rounded-lg p-6 shadow-sm"
            >
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-60 object-cover rounded mb-4"
                />
              )}

              <h2 className="text-2xl font-bold">
                {blog.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {blog.excerpt}
              </p>

              <div className="flex gap-4 mt-4 text-sm text-gray-500">
                <span>{blog.readingTime}</span>
                <span>{blog.status}</span>
              </div>

              <div className="mt-4">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-200 px-3 py-1 rounded mr-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/blogs/${blog.slug}`}
                className="inline-block mt-6 text-blue-600 font-semibold"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;