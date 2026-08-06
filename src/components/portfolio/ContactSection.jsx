import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Phone, MessageCircle, Send, GitBranch, Briefcase, Terminal, Camera, Share2 } from "lucide-react";
import InputField from "../common/InputField";
import TextAreaField from "../common/TextAreaField";
import Button from "../common/Button";
import SectionHeading from "./SectionHeading";
import { sendClientContactForm } from "../../services/clientContactService";
import { isNonEmpty, isValidEmail } from "../../utils/validators";
import { getErrorMessage } from "../../utils/getErrorMessage";

const INITIAL_FORM = {
  sendername: "",
  senderemail: "",
  senderwhatsappNo: "",
  subjectbysender: "",
  descriptionbysender: "",
};

const SOCIAL_ICON_MAP = [
  { key: "githublink", label: "GitHub", Icon: GitBranch },
  { key: "linkdinlink", label: "LinkedIn", Icon: Briefcase },
  { key: "leetcodelink", label: "LeetCode", Icon: Terminal },
  { key: "instagramlink", label: "Instagram", Icon: Camera },
  { key: "facebooklink", label: "Facebook", Icon: Share2 },
];

// Public "contact the owner" form + the owner's own direct contact details.
// The form gets more width (3/5) than the info card (2/5) since it holds
// more fields; both are matched-height boxed cards, and the info card
// centers its content vertically so it never looks like a sparse floating
// list next to the taller form.
const ContactSection = ({ contact, socialLinks, portfolioid }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const activeSocial = SOCIAL_ICON_MAP.filter((item) => socialLinks?.[item.key]);
  const hasDirectInfo = Boolean(contact?.email || contact?.phoneNo || contact?.whatsappNo);
  const hasLeftContent = hasDirectInfo || activeSocial.length > 0;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const nextErrors = {};
    if (!isNonEmpty(form.sendername)) nextErrors.sendername = "Your name is required.";
    if (!isValidEmail(form.senderemail)) nextErrors.senderemail = "Enter a valid email address.";
    if (!isNonEmpty(form.subjectbysender)) nextErrors.subjectbysender = "Subject is required.";
    if (!isNonEmpty(form.descriptionbysender)) nextErrors.descriptionbysender = "Message is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await sendClientContactForm({ ...form, portfolioid });
      if (result.success) {
        toast.success(result.message || "Message sent.");
        setForm(INITIAL_FORM);
      } else {
        toast.error(result.message || "Could not send your message.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not send your message."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-portfolioTint py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Contact" title="Let's talk" />

        <div className="grid gap-6 lg:grid-cols-5 lg:items-stretch">
          <div className="flex min-w-0 flex-col justify-center gap-4 rounded-lg border border-portfolioTintBorder bg-surface p-7 shadow-card sm:p-8 lg:col-span-2">
            {hasLeftContent ? (
              <>
                {contact?.email && <ContactRow icon={Mail} label={contact.email} />}
                {contact?.phoneNo && <ContactRow icon={Phone} label={contact.phoneNo} />}
                {contact?.whatsappNo && <ContactRow icon={MessageCircle} label={`WhatsApp: ${contact.whatsappNo}`} />}

                {activeSocial.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2.5">
                    {activeSocial.map(({ key, label, Icon }) => (
                      <a
                        key={key}
                        href={socialLinks[key]}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        title={label}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line bg-paper text-muted hover:border-portfolioAccent hover:text-portfolioAccent"
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-portfolioAccentSoft text-portfolioAccent">
                  <Mail size={22} />
                </div>
                <p className="max-w-[220px] text-sm text-muted">
                  No direct contact details listed - send a message using the form instead.
                </p>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex min-w-0 flex-col gap-4 rounded-lg border border-portfolioTintBorder bg-surface p-7 shadow-card sm:p-8 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Your name"
                name="sendername"
                value={form.sendername}
                onChange={handleChange}
                required
                error={errors.sendername}
              />
              <InputField
                label="Your email"
                name="senderemail"
                type="email"
                value={form.senderemail}
                onChange={handleChange}
                required
                error={errors.senderemail}
              />
            </div>
            <InputField
              label="WhatsApp number"
              name="senderwhatsappNo"
              value={form.senderwhatsappNo}
              onChange={handleChange}
            />
            <InputField
              label="Subject"
              name="subjectbysender"
              value={form.subjectbysender}
              onChange={handleChange}
              required
              error={errors.subjectbysender}
            />
            <TextAreaField
              label="Message"
              name="descriptionbysender"
              value={form.descriptionbysender}
              onChange={handleChange}
              required
              error={errors.descriptionbysender}
            />
            <Button type="submit" loading={submitting} icon={Send} className="w-fit">
              Send message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

const ContactRow = ({ icon: Icon, label }) => (
  <div className="flex min-w-0 items-center gap-3 rounded-md border border-line bg-paper px-5 py-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-portfolioAccentSoft text-portfolioAccent">
      <Icon size={17} />
    </div>
    <span className="min-w-0 flex-1 truncate text-base text-ink" title={label}>
      {label}
    </span>
  </div>
);

export default ContactSection;
