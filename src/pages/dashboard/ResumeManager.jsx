import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FileText } from "lucide-react";
import SectionCard from "../../components/common/SectionCard";
import ImageUploader from "../../components/common/ImageUploader";
import Button from "../../components/common/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loader from "../../components/common/Loader";
import { getMyResume, uploadResume, deleteResume } from "../../services/resumeService";
import { getErrorMessage } from "../../utils/getErrorMessage";

const ResumeManager = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const loadResume = () => {
    setLoading(true);
    return getMyResume()
      .then((result) => setCurrentUrl(result.data?.resumePic?.secure_url || ""))
      .catch((error) => toast.error(getErrorMessage(error, "Could not load resume.")))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadResume();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      toast.error("Choose a resume file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", resumeFile);

    setSaving(true);
    try {
      const result = await uploadResume(formData);
      if (result.success) {
        toast.success(result.message || "Resume uploaded.");
        setResumeFile(null);
        await loadResume();
      } else {
        toast.error(result.message || "Could not upload resume.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not upload resume."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const result = await deleteResume();
      if (result.success) {
        toast.success(result.message || "Resume deleted.");
        setCurrentUrl("");
      } else {
        toast.error(result.message || "Could not delete resume.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not delete resume."));
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  if (loading) return <Loader label="Loading resume…" />;

  return (
    <SectionCard
      icon={FileText}
      title="Resume"
      description="Upload an image of your resume. Uploading a new file always replaces the previous one."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <ImageUploader label="Resume file" currentUrl={currentUrl} onFileSelect={setResumeFile} />
        <div className="flex items-center justify-between pt-2">
          <Button type="submit" loading={saving}>
            Upload resume
          </Button>
          {currentUrl && (
            <Button variant="danger" type="button" onClick={() => setConfirmOpen(true)}>
              Delete resume
            </Button>
          )}
        </div>
      </form>

      <ConfirmModal
        open={confirmOpen}
        title="Delete resume?"
        description="Visitors will no longer be able to view or download your resume."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={deleting}
      />
    </SectionCard>
  );
};

export default ResumeManager;
