import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Briefcase } from "lucide-react";
import SectionCard from "../../components/common/SectionCard";
import TextAreaField from "../../components/common/TextAreaField";
import TagInput from "../../components/common/TagInput";
import Button from "../../components/common/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loader from "../../components/common/Loader";
import { getMyExperience, saveExperience, deleteExperience } from "../../services/experienceService";
import { getErrorMessage } from "../../utils/getErrorMessage";

const ExperienceEditor = () => {
  const [myexperience, setMyexperience] = useState("");
  const [existingTools, setExistingTools] = useState([]);
  const [newTools, setNewTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const loadExperience = () => {
    setLoading(true);
    return getMyExperience()
      .then((result) => {
        if (result.data) {
          setMyexperience(result.data.myexperience || "");
          setExistingTools(result.data.experiencedtools || []);
        }
      })
      .catch((error) => toast.error(getErrorMessage(error, "Could not load experience.")))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadExperience();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await saveExperience({ myexperience, experiencedtools: newTools });
      if (result.success) {
        toast.success(result.message || "Experience saved.");
        setNewTools([]);
        await loadExperience();
      } else {
        toast.error(result.message || "Could not save experience.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not save experience."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const result = await deleteExperience();
      if (result.success) {
        toast.success(result.message || "Experience deleted.");
        setMyexperience("");
        setExistingTools([]);
        setNewTools([]);
      } else {
        toast.error(result.message || "Could not delete experience.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not delete experience."));
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  if (loading) return <Loader label="Loading experience…" />;

  return (
    <SectionCard
      icon={Briefcase}
      title="Experience" description="Summarise your work experience and the tools you've used.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextAreaField
          label="Experience summary"
          name="myexperience"
          value={myexperience}
          onChange={(e) => setMyexperience(e.target.value)}
          rows={6}
        />
        <TagInput
          label="Tools & technologies used"
          value={newTools}
          onChange={setNewTools}
          existingTags={existingTools}
          placeholder="e.g. Docker, Postman"
        />

        <div className="flex items-center justify-between pt-2">
          <Button type="submit" loading={saving}>
            Save experience
          </Button>
          <Button variant="danger" type="button" onClick={() => setConfirmOpen(true)}>
            Clear section
          </Button>
        </div>
      </form>

      <ConfirmModal
        open={confirmOpen}
        title="Clear experience section?"
        description="This removes your experience summary and every saved tool. You can start over afterwards."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={deleting}
      />
    </SectionCard>
  );
};

export default ExperienceEditor;
