import { Link } from "react-router-dom";
import { ArrowRight, Newspaper } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import SectionHeading from "./SectionHeading";

// Strips HTML tags for a short plain-text preview under each title.
const excerpt = (html) => (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const BlogSection = ({ blogs, userid }) => {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section id="blog" className="border-b border-line bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Blog" title="Latest posts" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/portfolio/${userid}/blog/${blog._id}`}
              className="flex flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-card hover:border-portfolioAccent"
            >
              {blog.coverImage?.secure_url ? (
                <img
                  src={blog.coverImage.secure_url}
                  alt={blog.title}
                  className="h-44 w-full shrink-0 object-cover"
                />
              ) : (
                <div className="flex h-44 w-full shrink-0 items-center justify-center bg-portfolioAccentSoft text-portfolioAccent">
                  <Newspaper size={30} />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <span className="w-fit rounded-full bg-portfolioAccentSoft px-2.5 py-1 font-mono text-xs font-medium text-portfolioAccent">
                  {formatDate(blog.createdAt)}
                </span>
                <h3 className="mt-3 line-clamp-2 break-words text-base font-semibold leading-snug text-ink">
                  {blog.title}
                </h3>
                {excerpt(blog.content) && (
                  <p className="mt-2 line-clamp-3 flex-1 break-words text-sm text-muted">{excerpt(blog.content)}</p>
                )}
                <span className="mt-4 flex items-center gap-1 text-sm font-medium text-accent">
                  Read more
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
