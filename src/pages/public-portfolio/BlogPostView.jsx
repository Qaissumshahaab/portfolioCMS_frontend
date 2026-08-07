import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { getBlogById } from "../../services/blogService";
import { formatDate } from "../../utils/formatDate";
import { getErrorMessage } from "../../utils/getErrorMessage";
import Loader from "../../components/common/Loader";
import PortfolioMessageScreen from "../../components/portfolio/PortfolioMessageScreen";

const BlogPostView = () => {
  const { userid, blogid } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getBlogById(blogid)
      .then((result) => {
        if (!isMounted) return;
        if (result.data) {
          setBlog(result.data);
        } else {
          setNotFound(true);
        }
      })
      .catch((error) => {
        if (isMounted) {
          toast.error(getErrorMessage(error, "Could not load this post."));
          setNotFound(true);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [blogid]);

  if (loading) return <Loader label="Loading post…" />;

  if (notFound || !blog) {
    return (
      <PortfolioMessageScreen
        icon={FileQuestion}
        title="This post doesn't exist"
        description="It may have been unpublished or removed."
      />
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="border-b border-line bg-ink">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          <Link
            to={`/portfolio/${userid}`}
            className="flex w-fit items-center gap-1.5 text-sm text-mutedOnDark hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to portfolio
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <article className="rounded-lg border border-line bg-surface p-6 sm:p-10">
          {blog.coverImage?.secure_url && (
            <img
              src={blog.coverImage.secure_url}
              alt={blog.title}
              className="mb-6 w-full rounded-md border border-line object-cover"
            />
          )}
          <h1 className="break-words text-2xl font-semibold text-ink sm:text-3xl">{blog.title}</h1>
          <p className="mt-2 font-mono text-xs text-muted">{formatDate(blog.createdAt)}</p>

          {blog.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="break-words rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div
            className="blog-content mt-6 border-t border-line pt-6 text-sm leading-relaxed text-ink"
            // Content is authored by the portfolio owner in the dashboard's
            // rich text editor - safe to render as HTML for their own public page.
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPostView;
