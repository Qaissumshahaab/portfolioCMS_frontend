import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Sparkles } from "lucide-react";
import SectionCard from "../../components/common/SectionCard";
import TagInput from "../../components/common/TagInput";
import Button from "../../components/common/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loader from "../../components/common/Loader";
import { getMySkills, saveSkills, deleteSkills } from "../../services/skillsService";
import { getErrorMessage } from "../../utils/getErrorMessage";

const EMPTY_EXISTING = {
  languages: [],
  frontendFramework: [],
  backendFramework: [],
  toolsandecosystem: [],
};

const EMPTY_NEW = {
  languages: [],
  frontendFramework: [],
  backendFramework: [],
  toolsandecosystem: [],
};

const SkillsEditor = () => {
  const [existing, setExisting] = useState(EMPTY_EXISTING);
  const [draft, setDraft] = useState(EMPTY_NEW);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const loadSkills = () => {
    setLoading(true);
    return getMySkills()
      .then((result) => {
        if (result.data) {
          setExisting({
            languages: result.data.languages || [],
            frontendFramework: result.data.frontendFramework || [],
            backendFramework: result.data.backendFramework || [],
            toolsandecosystem: result.data.toolsandecosystem || [],
          });
        }
      })
      .catch((error) => toast.error(getErrorMessage(error, "Could not load skills.")))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const updateDraft = (key) => (values) => setDraft({ ...draft, [key]: values });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await saveSkills(draft);
      if (result.success) {
        toast.success(result.message || "Skills saved.");
        setDraft(EMPTY_NEW);
        await loadSkills();
      } else {
        toast.error(result.message || "Could not save skills.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not save skills."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const result = await deleteSkills();
      if (result.success) {
        toast.success(result.message || "Skills deleted.");
        setExisting(EMPTY_EXISTING);
        setDraft(EMPTY_NEW);
      } else {
        toast.error(result.message || "Could not delete skills.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not delete skills."));
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  if (loading) return <Loader label="Loading skills…" />;

  return (
    <SectionCard
      icon={Sparkles}
      title="Skills" description="Group your skills by category. Adding new ones never removes old ones.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TagInput
          label="Languages"
          value={draft.languages}
          onChange={updateDraft("languages")}
          existingTags={existing.languages}
          placeholder="e.g. JavaScript"
        />
        <TagInput
          label="Frontend frameworks"
          value={draft.frontendFramework}
          onChange={updateDraft("frontendFramework")}
          existingTags={existing.frontendFramework}
          placeholder="e.g. React"
        />
        <TagInput
          label="Backend frameworks"
          value={draft.backendFramework}
          onChange={updateDraft("backendFramework")}
          existingTags={existing.backendFramework}
          placeholder="e.g. Express"
        />
        <TagInput
          label="Tools & ecosystem"
          value={draft.toolsandecosystem}
          onChange={updateDraft("toolsandecosystem")}
          existingTags={existing.toolsandecosystem}
          placeholder="e.g. Git"
        />

        <div className="flex items-center justify-between pt-2">
          <Button type="submit" loading={saving}>
            Save skills
          </Button>
          <Button variant="danger" type="button" onClick={() => setConfirmOpen(true)}>
            Clear section
          </Button>
        </div>
      </form>

      <ConfirmModal
        open={confirmOpen}
        title="Clear skills section?"
        description="This removes every skill in every category. You can start over afterwards."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={deleting}
      />
    </SectionCard>
  );
};

export default SkillsEditor;
