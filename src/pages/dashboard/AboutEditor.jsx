import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserCircle } from "lucide-react";
import SectionCard from "../../components/common/SectionCard";
import TextAreaField from "../../components/common/TextAreaField";
import Button from "../../components/common/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loader from "../../components/common/Loader";
import { getMyAbout, saveAbout, deleteAbout } from "../../services/aboutService";
import { getErrorMessage } from "../../utils/getErrorMessage";

const INITIAL_FORM = {
  biography: "",
  background: "",
  careerGoals: "",
  whatIenjoybuilding: "",
};

const AboutEditor = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getMyAbout()
      .then((result) => {
        if (isMounted && result.data) {
          setForm({
            biography: result.data.biography || "",
            background: result.data.background || "",
            careerGoals: result.data.careerGoals || "",
            whatIenjoybuilding: result.data.whatIenjoybuilding || "",
          });
        }
      })
      .catch((error) => toast.error(getErrorMessage(error, "Could not load about section.")))
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
      const result = await saveAbout(form);
      if (result.success) {
        toast.success(result.message || "About section saved.");
      } else {
        toast.error(result.message || "Could not save about section.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not save about section."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const result = await deleteAbout();
      if (result.success) {
        toast.success(result.message || "About section deleted.");
        setForm(INITIAL_FORM);
      } else {
        toast.error(result.message || "Could not delete about section.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not delete about section."));
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  if (loading) return <Loader label="Loading about section…" />;

  return (
    <SectionCard
      icon={UserCircle}
      title="About" description="Tell visitors who you are, your background and what drives you.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextAreaField label="Biography" name="biography" value={form.biography} onChange={handleChange} />
        <TextAreaField label="Background" name="background" value={form.background} onChange={handleChange} />
        <TextAreaField label="Career goals" name="careerGoals" value={form.careerGoals} onChange={handleChange} />
        <TextAreaField
          label="What I enjoy building"
          name="whatIenjoybuilding"
          value={form.whatIenjoybuilding}
          onChange={handleChange}
        />

        <div className="flex items-center justify-between pt-2">
          <Button type="submit" loading={saving}>
            Save about
          </Button>
          <Button variant="danger" type="button" onClick={() => setConfirmOpen(true)}>
            Delete section
          </Button>
        </div>
      </form>

      <ConfirmModal
        open={confirmOpen}
        title="Delete about section?"
        description="This removes your biography, background, career goals and interests from your public portfolio."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={deleting}
      />
    </SectionCard>
  );
};

export default AboutEditor;
