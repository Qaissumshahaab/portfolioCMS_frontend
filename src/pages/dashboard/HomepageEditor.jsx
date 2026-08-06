import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Home } from "lucide-react";
import SectionCard from "../../components/common/SectionCard";
import InputField from "../../components/common/InputField";
import TextAreaField from "../../components/common/TextAreaField";
import ImageUploader from "../../components/common/ImageUploader";
import Button from "../../components/common/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loader from "../../components/common/Loader";
import { getMyHomepage, saveHomepage, deleteHomepage } from "../../services/homepageService";
import { isNonEmpty } from "../../utils/validators";
import { getErrorMessage } from "../../utils/getErrorMessage";

const INITIAL_FORM = { fullName: "", title: "", introduction: "" };

const HomepageEditor = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let isMounted = true;
    getMyHomepage()
      .then((result) => {
        if (!isMounted) return;
        const data = result.data;
        if (data) {
          setForm({
            fullName: data.fullName || "",
            title: data.title || "",
            introduction: data.introduction || "",
          });
          setCurrentUrl(data.profilePic?.secure_url || "");
        }
      })
      .catch((error) => toast.error(getErrorMessage(error, "Could not load your homepage.")))
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const nextErrors = {};
    if (!isNonEmpty(form.fullName)) nextErrors.fullName = "Full name is required.";
    if (!isNonEmpty(form.title)) nextErrors.title = "A short title is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("title", form.title);
    formData.append("introduction", form.introduction);
    if (profilePicFile) formData.append("image", profilePicFile);

    setSaving(true);
    try {
      const result = await saveHomepage(formData);
      if (result.success) {
        toast.success(result.message || "Homepage saved.");
        setProfilePicFile(null);
      } else {
        toast.error(result.message || "Could not save homepage.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not save homepage."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const result = await deleteHomepage();
      if (result.success) {
        toast.success(result.message || "Homepage deleted.");
        setForm(INITIAL_FORM);
        setCurrentUrl("");
        setProfilePicFile(null);
      } else {
        toast.error(result.message || "Could not delete homepage.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not delete homepage."));
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  if (loading) return <Loader label="Loading your homepage…" />;

  return (
    <SectionCard
      icon={Home}
      title="Homepage"
      description="The hero visitors see first: your name, a short title, and a profile picture."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="Full name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
          error={errors.fullName}
        />
        <InputField
          label="Title"
          name="title"
          placeholder="e.g. MERN Stack Developer"
          value={form.title}
          onChange={handleChange}
          required
          error={errors.title}
        />
        <TextAreaField
          label="Introduction"
          name="introduction"
          placeholder="A short line about what you do."
          value={form.introduction}
          onChange={handleChange}
          rows={4}
        />
        <ImageUploader label="Profile picture" currentUrl={currentUrl} onFileSelect={setProfilePicFile} />

        <div className="flex items-center justify-between pt-2">
          <Button type="submit" loading={saving}>
            Save homepage
          </Button>
          <Button variant="danger" type="button" onClick={() => setConfirmOpen(true)}>
            Delete section
          </Button>
        </div>
      </form>

      <ConfirmModal
        open={confirmOpen}
        title="Delete homepage section?"
        description="This removes your name, title, introduction and profile picture from your public portfolio."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={deleting}
      />
    </SectionCard>
  );
};

export default HomepageEditor;
