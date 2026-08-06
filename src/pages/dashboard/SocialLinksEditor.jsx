import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link2 } from "lucide-react";
import SectionCard from "../../components/common/SectionCard";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loader from "../../components/common/Loader";
import { getMySocialLinks, saveSocialLinks, deleteSocialLinks } from "../../services/socialLinksService";
import { getErrorMessage } from "../../utils/getErrorMessage";

const INITIAL_FORM = {
  facebooklink: "",
  instagramlink: "",
  githublink: "",
  linkdinlink: "",
  leetcodelink: "",
};

const SocialLinksEditor = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getMySocialLinks()
      .then((result) => {
        if (isMounted && result.data) {
          setForm({
            facebooklink: result.data.facebooklink || "",
            instagramlink: result.data.instagramlink || "",
            githublink: result.data.githublink || "",
            linkdinlink: result.data.linkdinlink || "",
            leetcodelink: result.data.leetcodelink || "",
          });
        }
      })
      .catch((error) => toast.error(getErrorMessage(error, "Could not load social links.")))
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await saveSocialLinks(form);
      if (result.success) {
        toast.success(result.message || "Social links saved.");
      } else {
        toast.error(result.message || "Could not save social links.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not save social links."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const result = await deleteSocialLinks();
      if (result.success) {
        toast.success(result.message || "Social links deleted.");
        setForm(INITIAL_FORM);
      } else {
        toast.error(result.message || "Could not delete social links.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not delete social links."));
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  if (loading) return <Loader label="Loading social links…" />;

  return (
    <SectionCard
      icon={Link2}
      title="Social links" description="Shown as icons/links on your public portfolio.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField label="GitHub" name="githublink" value={form.githublink} onChange={handleChange} placeholder="https://github.com/..." />
        <InputField label="LinkedIn" name="linkdinlink" value={form.linkdinlink} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
        <InputField label="LeetCode" name="leetcodelink" value={form.leetcodelink} onChange={handleChange} placeholder="https://leetcode.com/..." />
        <InputField label="Instagram" name="instagramlink" value={form.instagramlink} onChange={handleChange} placeholder="https://instagram.com/..." />
        <InputField label="Facebook" name="facebooklink" value={form.facebooklink} onChange={handleChange} placeholder="https://facebook.com/..." />

        <div className="flex items-center justify-between pt-2">
          <Button type="submit" loading={saving}>
            Save social links
          </Button>
          <Button variant="danger" type="button" onClick={() => setConfirmOpen(true)}>
            Delete section
          </Button>
        </div>
      </form>

      <ConfirmModal
        open={confirmOpen}
        title="Delete social links?"
        description="This removes every social link from your public portfolio."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={deleting}
      />
    </SectionCard>
  );
};

export default SocialLinksEditor;
