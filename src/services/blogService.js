import axiosInstance from "./axiosInstance";

// POST /api/blog/createblog - multipart (title, content, tags[], image?)
// Unlike the other sections, blog posts are a real collection - every call creates a new post.
export const createBlog = (formData) =>
  axiosInstance
    .post("/blog/createblog", formData)
    .then((res) => res.data);

export const getMyBlogs = () =>
  axiosInstance.get("/blog/getblogs").then((res) => res.data);

// POST /api/blog/updateblog - multipart (blogid, title?, content?, tags?, image?)
// Cover image is only replaced if a new file is attached.
export const updateBlog = (formData) =>
  axiosInstance
    .post("/blog/updateblog", formData)
    .then((res) => res.data);

export const getBlogsByPortfolioId = (portfolioid) =>
  axiosInstance.get(`/blog/getblogs/${portfolioid}`).then((res) => res.data);

export const getBlogById = (blogid) =>
  axiosInstance.get(`/blog/getblog/${blogid}`).then((res) => res.data);

export const deleteBlog = (blogid) =>
  axiosInstance.post("/blog/deleteblog", { blogid }).then((res) => res.data);

export const publishBlog = (blogid, published) =>
  axiosInstance.post("/blog/publishblog", { blogid, published }).then((res) => res.data);
