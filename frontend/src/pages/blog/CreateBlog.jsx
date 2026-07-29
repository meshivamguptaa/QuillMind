import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../services/blogService";

const CreateBlog = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      status: "draft",
    },
  });

  const onSubmit = async (formData) => {
    try {
      formData.tags = formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [];

      await createBlog(formData);

      alert("Blog created successfully!");

      reset();

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create blog.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Create Blog
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <input
          {...register("title", { required: true })}
          placeholder="Blog Title"
          className="w-full border rounded p-3"
        />

        <textarea
          {...register("excerpt", { required: true })}
          placeholder="Short Excerpt"
          rows={3}
          className="w-full border rounded p-3"
        />

        <input
          {...register("coverImage")}
          placeholder="Cover Image URL"
          className="w-full border rounded p-3"
        />

        <input
          {...register("tags")}
          placeholder="react,node,mongodb"
          className="w-full border rounded p-3"
        />

        <select
          {...register("status")}
          className="w-full border rounded p-3"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <textarea
          {...register("content", { required: true })}
          rows={15}
          placeholder="Write your blog in Markdown..."
          className="w-full border rounded p-3 font-mono"
        />

        <input
          {...register("seoTitle")}
          placeholder="SEO Title"
          className="w-full border rounded p-3"
        />

        <textarea
          {...register("seoDescription")}
          rows={3}
          placeholder="SEO Description"
          className="w-full border rounded p-3"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;