import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FolderGit2, ListChecks } from "lucide-react";
import SectionCard from "../../components/common/SectionCard";
import InputField from "../../components/common/InputField";
import TagInput from "../../components/common/TagInput";
import Button from "../../components/common/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import { createProject, updateProject, getMyProjects, deleteProject } from "../../services/projectsService";
import { isNonEmpty } from "../../utils/validators";
import { getErrorMessage } from "../../utils/getErrorMessage";

const INITIAL_FORM = { name: "", githublink: "", livelink: "" };

// A portfolio can now hold many projects - this editor is a create/edit form
// plus a list of existing project cards (same "click Edit to load it into the
// form" pattern used for blog posts).
const ProjectsEditor = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProject, setEditingProject] = useState(null); // null = create mode
  const [form, setForm] = useState(INITIAL_FORM);
  const [existingTech, setExistingTech] = useState([]);
  const [newTech, setNewTech] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [busyId, setBusyId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const loadProjects = () => {
    setLoading(true);
    return getMyProjects()
      .then((result) => setProjects(result.data || []))
      .catch((error) => toast.error(getErrorMessage(error, "Could not load projects.")))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const resetForm = () => {
    setEditingProject(null);
    setForm(INITIAL_FORM);
    setExistingTech([]);
    setNewTech([]);
    setErrors({});
  };

  const startEditing = (entry) => {
    setEditingProject(entry);
    setForm({
      name: entry.project?.name || "",
      githublink: entry.project?.githublink || "",
      livelink: entry.project?.livelink || "",
    });
    setExistingTech(entry.project?.technologiesused || []);
    setNewTech([]);
    setErrors({});
    window.scrollTo({ top: 0 });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const nextErrors = {};
    if (!isNonEmpty(form.name)) nextErrors.name = "Project name is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const result = editingProject
        ? await updateProject(editingProject._id, { ...form, technologiesused: newTech })
        : await createProject({ ...form, technologiesused: newTech });

      if (result.success) {
        toast.success(result.message || (editingProject ? "Project updated." : "Project added."));
        resetForm();
        await loadProjects();
      } else {
        toast.error(result.message || "Could not save project.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not save project."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setBusyId(confirmDeleteId);
    try {
      const result = await deleteProject(confirmDeleteId);
      if (result.success) {
        toast.success(result.message || "Project deleted.");
        if (editingProject?._id === confirmDeleteId) resetForm();
        await loadProjects();
      } else {
        toast.error(result.message || "Could not delete project.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not delete project."));
    } finally {
      setBusyId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
      icon={FolderGit2}
      title={editingProject ? "Edit project" : "Add a project"}
        description="Add as many projects as you like - each shows up as its own card on your public portfolio."
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            label="Project name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            error={errors.name}
          />
          <InputField
            label="GitHub link"
            name="githublink"
            value={form.githublink}
            onChange={handleChange}
            placeholder="https://github.com/..."
          />
          <InputField
            label="Live link"
            name="livelink"
            value={form.livelink}
            onChange={handleChange}
            placeholder="https://..."
          />
          <TagInput
            label="Technologies used"
            value={newTech}
            onChange={setNewTech}
            existingTags={existingTech}
            placeholder="e.g. MongoDB"
          />

          <div className="flex gap-2 pt-2">
            <Button type="submit" loading={saving}>
              {editingProject ? "Save changes" : "Add project"}
            </Button>
            {editingProject && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel edit
              </Button>
            )}
          </div>
        </form>
      </SectionCard>

      <SectionCard icon={ListChecks} title="Your projects" description="Edit or remove a project.">
        {loading ? (
          <Loader label="Loading projects…" />
        ) : projects.length === 0 ? (
          <EmptyState title="No projects yet" description="Projects you add above will show up here." />
        ) : (
          <ul className="flex flex-col divide-y divide-line">
            {projects.map((entry) => (
              <li key={entry._id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{entry.project?.name}</p>
                  {entry.project?.technologiesused?.length > 0 && (
                    <p className="mt-0.5 truncate font-mono text-xs text-muted">
                      {entry.project.technologiesused.join(", ")}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button variant="secondary" onClick={() => startEditing(entry)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setConfirmDeleteId(entry._id)}
                    loading={busyId === entry._id}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <ConfirmModal
        open={Boolean(confirmDeleteId)}
        title="Delete this project?"
        description="This removes it from your public portfolio. This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteId(null)}
        loading={Boolean(busyId)}
      />
    </div>
  );
};

export default ProjectsEditor;
