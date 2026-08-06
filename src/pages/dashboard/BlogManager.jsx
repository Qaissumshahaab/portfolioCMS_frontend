import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Newspaper, ListChecks } from "lucide-react";
import SectionCard from "../../components/common/SectionCard";
import InputField from "../../components/common/InputField";
import RichTextEditor from "../../components/common/RichTextEditor";
import TagInput from "../../components/common/TagInput";
import ImageUploader from "../../components/common/ImageUploader";
import Button from "../../components/common/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { createBlog, updateBlog, getMyBlogs, deleteBlog, publishBlog } from "../../services/blogService";
import { formatDate } from "../../utils/formatDate";
import { isNonEmpty } from "../../utils/validators";
import { getErrorMessage } from "../../utils/getErrorMessage";

const INITIAL_FORM = { title: "" };

// Strips HTML tags to check "is there actually any text" for validation,
// since an empty contentEditable can still contain a stray "<br>".
const hasText = (html) => html.replace(/<[^>]*>/g, "").trim().length > 0;

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingBlog, setEditingBlog] = useState(null); // null = create mode
  const [form, setForm] = useState(INITIAL_FORM);
  const [contentHtml, setContentHtml] = useState("");
  const [tags, setTags] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const [busyBlogId, setBusyBlogId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const loadBlogs = () => {
    setLoading(true);
    return getMyBlogs()
      .then((result) => setBlogs(result.data || []))
      .catch((error) => toast.error(getErrorMessage(error, "Could not load blog posts.")))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const resetForm = () => {
    setEditingBlog(null);
    setForm(INITIAL_FORM);
    setContentHtml("");
    setTags([]);
    setCoverImage(null);
    setErrors({});
  };

  const startEditing = (blog) => {
    setEditingBlog(blog);
    setForm({ title: blog.title || "" });
    setContentHtml(blog.content || "");
    setTags(blog.tags || []);
    setCoverImage(null);
    setErrors({});
    window.scrollTo({ top: 0 });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const nextErrors = {};
    if (!isNonEmpty(form.title)) nextErrors.title = "Title is required.";
    if (!hasText(contentHtml)) nextErrors.content = "Content is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    if (editingBlog) formData.append("blogid", editingBlog._id);
    formData.append("title", form.title);
    formData.append("content", contentHtml);
    tags.forEach((tag) => formData.append("tags", tag));
    if (coverImage) formData.append("image", coverImage);

    setSaving(true);
    try {
      const result = editingBlog ? await updateBlog(formData) : await createBlog(formData);
      if (result.success) {
        toast.success(result.message || (editingBlog ? "Blog post updated." : "Blog post created."));
        resetForm();
        await loadBlogs();
      } else {
        toast.error(result.message || "Could not save blog post.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not save blog post."));
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (blog) => {
    setBusyBlogId(blog._id);
    try {
      const result = await publishBlog(blog._id, !blog.published);
      if (result.success) {
        toast.success(result.message || "Blog post updated.");
        await loadBlogs();
      } else {
        toast.error(result.message || "Could not update blog post.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not update blog post."));
    } finally {
      setBusyBlogId(null);
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setBusyBlogId(confirmDeleteId);
    try {
      const result = await deleteBlog(confirmDeleteId);
      if (result.success) {
        toast.success(result.message || "Blog post deleted.");
        if (editingBlog?._id === confirmDeleteId) resetForm();
        await loadBlogs();
      } else {
        toast.error(result.message || "Could not delete blog post.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not delete blog post."));
    } finally {
      setBusyBlogId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        icon={Newspaper}
        title={editingBlog ? "Edit blog post" : "Write a blog post"}
        description="Published posts appear on your public portfolio."
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField label="Title" name="title" value={form.title} onChange={handleChange} required error={errors.title} />

          <RichTextEditor
            key={editingBlog?._id || "new"}
            label="Content"
            initialValue={contentHtml}
            onChange={setContentHtml}
          />
          {errors.content && <span className="-mt-2 text-xs text-danger">{errors.content}</span>}

          <TagInput label="Tags" value={tags} onChange={setTags} placeholder="e.g. react" />
          <ImageUploader
            label="Cover image"
            currentUrl={editingBlog?.coverImage?.secure_url || ""}
            onFileSelect={setCoverImage}
            helpText={editingBlog ? "Leave empty to keep the current cover image." : "JPG, PNG or WEBP, up to 5MB."}
          />

          <div className="flex gap-2">
            <Button type="submit" loading={saving}>
              {editingBlog ? "Save changes" : "Publish draft"}
            </Button>
            {editingBlog && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel edit
              </Button>
            )}
          </div>
        </form>
      </SectionCard>

      <SectionCard icon={ListChecks} title="Your blog posts" description="Edit, toggle publish status, or remove a post.">
        {loading ? (
          <Loader label="Loading blog posts…" />
        ) : blogs.length === 0 ? (
          <EmptyState title="No blog posts yet" description="Posts you write above will show up here." />
        ) : (
          <ul className="flex flex-col divide-y divide-line">
            {blogs.map((blog) => (
              <li key={blog._id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{blog.title}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted">
                    {formatDate(blog.createdAt)} · {blog.published ? "Published" : "Draft"}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button variant="secondary" onClick={() => startEditing(blog)}>
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleTogglePublish(blog)}
                    loading={busyBlogId === blog._id}
                  >
                    {blog.published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button variant="danger" onClick={() => setConfirmDeleteId(blog._id)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <ConfirmModal
        open={Boolean(confirmDeleteId)}
        title="Delete this blog post?"
        description="This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteId(null)}
        loading={Boolean(busyBlogId)}
      />
    </div>
  );
};

export default BlogManager;
