export interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  locked?: boolean;
  enabled?: boolean;
  options?: string[];
}

export interface MediaForm {
  id: string;
  name: string;
  slug: string;
  status: "active" | "draft" | "closed";
  site: string;
  submissionCount: number;
  lastSubmission: string;
  maxSize: number;
  maxFiles: number;
  acceptedTypes: string[];
  successMessage: string;
  notificationEmail: string;
  autoReply: boolean;
  heroImageUrl: string;
  formDescription: string;
  fields: FormField[];
}

export const mediaForms: MediaForm[] = [
  {
    id: "1",
    name: "Spring 2025 Campus Photo Drive",
    slug: "campus-photos",
    status: "active",
    site: "COE Main",
    submissionCount: 156,
    lastSubmission: "2 hours ago",
    maxSize: 10,
    maxFiles: 10,
    acceptedTypes: ["JPG", "PNG", "GIF", "MP4"],
    successMessage: "Thank you for your submission!",
    notificationEmail: "admin@education.ufl.edu",
    autoReply: true,
    heroImageUrl: "",
    formDescription:
      "Submit your photos for the chance to be featured on the @uf_coe Instagram and other social channels.",
    fields: [
      { id: "1", type: "text", label: "Submitter Name", required: true, locked: true, enabled: true },
      { id: "2", type: "email", label: "Submitter Email", required: true, locked: true, enabled: true },
      { id: "3", type: "text", label: "Title / Caption", required: false, enabled: true },
      { id: "4", type: "textarea", label: "Description", required: false, enabled: true },
      { id: "5", type: "select", label: "Category", required: false, enabled: true, options: ["Research Events", "Faculty Resources", "Student Life", "Alumni Relations", "Campus Life"] },
      { id: "6", type: "text", label: "Department / School", required: false, enabled: false },
      { id: "7", type: "date", label: "Date of Media", required: false, enabled: false },
      { id: "8", type: "checkbox", label: "Usage Rights Agreement", required: false, enabled: false },
    ],
  },
  {
    id: "2",
    name: "Faculty Research Highlights",
    slug: "research-highlights",
    status: "active",
    site: "Research Portal",
    submissionCount: 43,
    lastSubmission: "1 day ago",
    maxSize: 10,
    maxFiles: 8,
    acceptedTypes: ["JPG", "PNG"],
    successMessage: "Your research highlight was submitted successfully.",
    notificationEmail: "research@education.ufl.edu",
    autoReply: false,
    heroImageUrl: "",
    formDescription: "Share photos and details that highlight faculty research work.",
    fields: [
      { id: "1", type: "text", label: "Submitter Name", required: true, locked: true, enabled: true },
      { id: "2", type: "email", label: "Submitter Email", required: true, locked: true, enabled: true },
      { id: "3", type: "text", label: "Research Project Title", required: true, enabled: true },
      { id: "4", type: "textarea", label: "Project Summary", required: true, enabled: true },
      { id: "5", type: "text", label: "Principal Investigator", required: false, enabled: true },
    ],
  },
  {
    id: "3",
    name: "Alumni Event Photos",
    slug: "alumni-events",
    status: "draft",
    site: "Alumni Portal",
    submissionCount: 0,
    lastSubmission: "Never",
    maxSize: 25,
    maxFiles: 15,
    acceptedTypes: ["JPG", "PNG", "MP4", "MOV"],
    successMessage: "Thanks for submitting your alumni event media.",
    notificationEmail: "alumni@education.ufl.edu",
    autoReply: true,
    heroImageUrl: "",
    formDescription: "Upload photos and videos from alumni events for publishing.",
    fields: [
      { id: "1", type: "text", label: "Submitter Name", required: true, locked: true, enabled: true },
      { id: "2", type: "email", label: "Submitter Email", required: true, locked: true, enabled: true },
      { id: "3", type: "text", label: "Event Name", required: true, enabled: true },
      { id: "4", type: "date", label: "Event Date", required: false, enabled: true },
      { id: "5", type: "textarea", label: "Caption", required: false, enabled: true },
    ],
  },
];

export const getMediaFormById = (formId: string) =>
  mediaForms.find((form) => form.id === formId);
