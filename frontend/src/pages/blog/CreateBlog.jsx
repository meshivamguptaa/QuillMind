import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { createBlog } from "../../services/blogService";
import { generateBlog } from "../../services/aiService";

const CreateBlog = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      status: "draft",
    },
  });

  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    try {
      setGenerating(true);

      const { data } = await generateBlog(topic);

      setValue("title", data.blog.title);
      setValue("excerpt", data.blog.excerpt);
      setValue("content", data.blog.content);
      setValue("seoTitle", data.blog.seoTitle);
      setValue("seoDescription", data.blog.seoDescription);

      // If your backend returns tags in the future,
      // uncomment this line:
      // setValue("tags", data.blog.tags.join(", "));
    } catch (error) {
      alert(error.response?.data?.message || "AI generation failed.");
    } finally {
      setGenerating(false);
    }
  };

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
      setTopic("");

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

      {/* AI Generator */}
      <div className="border rounded-lg p-5 mb-8">
        <h2 className="text-xl font-bold mb-4">
          Generate Blog with AI
        </h2>

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
          className="w-full border rounded p-3 mb-4"
        />

        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="bg-purple-600 text-white px-5 py-3 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {generating ? "Generating..." : "Generate with AI"}
        </button>
      </div>

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