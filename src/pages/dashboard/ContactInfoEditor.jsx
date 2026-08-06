import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";
import SectionCard from "../../components/common/SectionCard";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loader from "../../components/common/Loader";
import { getMyContact, saveContact, deleteContact } from "../../services/contactService";
import { getErrorMessage } from "../../utils/getErrorMessage";

const INITIAL_FORM = { email: "", phoneNo: "", whatsappNo: "" };

const ContactInfoEditor = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getMyContact()
      .then((result) => {
        if (isMounted && result.data) {
          setForm({
            email: result.data.email || "",
            phoneNo: result.data.phoneNo || "",
            whatsappNo: result.data.whatsappNo || "",
          });
        }
      })
      .catch((error) => toast.error(getErrorMessage(error, "Could not load contact info.")))
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
      const result = await saveContact(form);
      if (result.success) {
        toast.success(result.message || "Contact info saved.");
      } else {
        toast.error(result.message || "Could not save contact info.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not save contact info."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const result = await deleteContact();
      if (result.success) {
        toast.success(result.message || "Contact info deleted.");
        setForm(INITIAL_FORM);
      } else {
        toast.error(result.message || "Could not delete contact info.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not delete contact info."));
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  if (loading) return <Loader label="Loading contact info…" />;

  return (
    <SectionCard
      icon={Mail}
      title="Contact info" description="How visitors can reach you directly.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <InputField label="Phone number" name="phoneNo" value={form.phoneNo} onChange={handleChange} />
        <InputField label="WhatsApp number" name="whatsappNo" value={form.whatsappNo} onChange={handleChange} />

        <div className="flex items-center justify-between pt-2">
          <Button type="submit" loading={saving}>
            Save contact info
          </Button>
          <Button variant="danger" type="button" onClick={() => setConfirmOpen(true)}>
            Delete section
          </Button>
        </div>
      </form>

      <ConfirmModal
        open={confirmOpen}
        title="Delete contact info?"
        description="This removes your contact details from your public portfolio."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={deleting}
      />
    </SectionCard>
  );
};

export default ContactInfoEditor;
