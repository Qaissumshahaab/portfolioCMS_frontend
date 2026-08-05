import axiosInstance from "./axiosInstance";

// POST /api/clientcontact/sendcontactform - public contact form on a portfolio page.
// Sends an email to the portfolio owner and a confirmation email to the sender.
export const sendClientContactForm = (payload) =>
  axiosInstance.post("/clientcontact/sendcontactform", payload).then((res) => res.data);
