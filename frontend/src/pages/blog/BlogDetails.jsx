import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../../services/blogService";

import ReactMarkdown from "react-markdown";

const BlogDetails = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const { data } = await getBlog(slug);
      setBlog(data.blog);
    } catch (error) {
      console.error(error);
    }
  };

  if (!blog) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">

      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}

      <h1 className="text-5xl font-bold mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-500 mb-6">
        {blog.readingTime}
      </p>

      <div className="flex gap-2 mb-8 flex-wrap">
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-lg text-gray-600 mb-8">
        {blog.excerpt}
      </p>

      <div className="prose prose-lg max-w-none">
  <ReactMarkdown>
    {blog.content}
  </ReactMarkdown>
</div>
    </div>
  );
};

export default BlogDetails;