import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getBlogById,
  updateBlog,
} from "../../services/blogService";

const EditBlog = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    coverImage: "",
    tags: "",
    status: "draft",
    content: "",
    seoTitle: "",
    seoDescription: "",
  });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const { data } = await getBlogById(id);

      setForm({
        title: data.blog.title,
        excerpt: data.blog.excerpt,
        coverImage: data.blog.coverImage || "",
        tags: data.blog.tags.join(", "),
        status: data.blog.status,
        content: data.blog.content,
        seoTitle: data.blog.seoTitle || "",
        seoDescription: data.blog.seoDescription || "",
      });
    } catch (error) {
      alert("Failed to load blog.");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBlog(id, {
        ...form,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      alert("Blog updated successfully!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Edit Blog
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border rounded p-3"
        />

        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          rows={3}
          placeholder="Excerpt"
          className="w-full border rounded p-3"
        />

        <input
          name="coverImage"
          value={form.coverImage}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="w-full border rounded p-3"
        />

        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="react,node,mongodb"
          className="w-full border rounded p-3"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded p-3"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={15}
          className="w-full border rounded p-3"
        />

        <input
          name="seoTitle"
          value={form.seoTitle}
          onChange={handleChange}
          placeholder="SEO Title"
          className="w-full border rounded p-3"
        />

        <textarea
          name="seoDescription"
          value={form.seoDescription}
          onChange={handleChange}
          rows={3}
          placeholder="SEO Description"
          className="w-full border rounded p-3"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;