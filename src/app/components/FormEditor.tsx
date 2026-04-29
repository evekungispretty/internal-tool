import { useState } from "react";
import { X, GripVertical, Lock, Plus, Eye, Monitor, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { FormField, getMediaFormById } from "../utils/mediaFormsData";

interface FormEditorProps {
  formId: string;
  onClose: () => void;
}

const STEPS = ["Form Setup", "Appearance", "Publishing"];

const COLOR_PRESETS = [
  { label: "UF Blue", value: "#003087" },
  { label: "Navy", value: "#001F5B" },
  { label: "Dark Teal", value: "#005F73" },
  { label: "Slate", value: "#334155" },
  { label: "Black", value: "#0F172A" },
];

const HEADING_COLOR_PRESETS = [
  { label: "UF Gold", value: "#FFD700" },
  { label: "White", value: "#FFFFFF" },
  { label: "Cream", value: "#FFF8E7" },
  { label: "Light Blue", value: "#BAE6FD" },
  { label: "Amber", value: "#FCD34D" },
];

export function FormEditor({ formId, onClose }: FormEditorProps) {
  const selectedForm = formId === "new" ? null : getMediaFormById(formId);

  const [step, setStep] = useState(0);
  const [formName, setFormName] = useState(selectedForm?.name ?? "Untitled Form");
  const [formDescription, setFormDescription] = useState(
    selectedForm?.formDescription ??
      "Submit your photos for the chance to be featured on the @uf_coe Instagram and other social channels."
  );
  const [status, setStatus] = useState<"draft" | "active" | "closed">(selectedForm?.status ?? "draft");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [selectedSite, setSelectedSite] = useState(selectedForm?.site ?? "COE Main");
  const [urlSlug, setUrlSlug] = useState(selectedForm?.slug ?? "new-form");
  const [maxFileSize, setMaxFileSize] = useState(selectedForm?.maxSize ?? 10);
  const [maxFiles, setMaxFiles] = useState(selectedForm?.maxFiles ?? 10);
  const [acceptedTypes, setAcceptedTypes] = useState(selectedForm?.acceptedTypes ?? ["JPG", "PNG", "GIF", "MP4"]);
  const [successMessage, setSuccessMessage] = useState(selectedForm?.successMessage ?? "Thank you for your submission!");
  const [notificationEmail, setNotificationEmail] = useState(selectedForm?.notificationEmail ?? "");
  const [autoReply, setAutoReply] = useState(selectedForm?.autoReply ?? false);
  const [heroImageUrl, setHeroImageUrl] = useState(selectedForm?.heroImageUrl ?? "");
  const [primaryColor, setPrimaryColor] = useState("#003087");
  const [headingColor, setHeadingColor] = useState("#FFD700");
  const [font, setFont] = useState("System Default");

  const [fields, setFields] = useState<FormField[]>([
    ...(selectedForm?.fields ?? [
      { id: "1", type: "text", label: "Submitter Name", required: true, locked: true, enabled: true },
      { id: "2", type: "email", label: "Submitter Email", required: true, locked: true, enabled: true },
      { id: "3", type: "text", label: "Title / Caption", required: false, enabled: true },
      { id: "4", type: "textarea", label: "Description", required: false, enabled: true },
      { id: "5", type: "select", label: "Category", required: false, enabled: true },
      { id: "6", type: "text", label: "Department / School", required: false, enabled: false },
      { id: "7", type: "date", label: "Date of Media", required: false, enabled: false },
      { id: "8", type: "checkbox", label: "Usage Rights Agreement", required: false, enabled: false },
    ]),
  ]);

  const fileTypes = ["JPG", "PNG", "GIF", "MP4", "MOV", "AVI"];

  const toggleFileType = (type: string) => {
    setAcceptedTypes(
      acceptedTypes.includes(type)
        ? acceptedTypes.filter((t) => t !== type)
        : [...acceptedTypes, type]
    );
  };

  const toggleField = (fieldId: string) => {
    setFields(fields.map((f) => (f.id === fieldId && !f.locked ? { ...f, enabled: !f.enabled } : f)));
  };

  const updateFieldLabel = (fieldId: string, value: string) => {
    setFields(fields.map((f) => (f.id === fieldId ? { ...f, label: value } : f)));
  };

  const toggleRequired = (fieldId: string) => {
    setFields(fields.map((f) => (f.id === fieldId ? { ...f, required: !f.required } : f)));
  };

  const statusConfig = {
    draft: { label: "Draft", className: "bg-gray-100 text-gray-700" },
    active: { label: "Active", className: "bg-green-100 text-green-700" },
    closed: { label: "Closed", className: "bg-red-100 text-red-700" },
  };

  const headerBg = heroImageUrl
    ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImageUrl})`
    : `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%)`;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Top Bar */}
      <div className="border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
          <span className="text-sm text-muted-foreground">All changes saved</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost">Save Draft</Button>
          {step === STEPS.length - 1 && (
            <Button className="bg-[#003087] hover:bg-[#002866]">Publish Form</Button>
          )}
        </div>
      </div>

      {/* Split Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-[40%] border-r flex flex-col overflow-hidden">
          {/* Step Indicator */}
          <div className="px-6 pt-5 pb-4 border-b bg-gray-50">
            <div className="flex items-center gap-0">
              {STEPS.map((label, i) => (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  <button
                    onClick={() => setStep(i)}
                    className="flex items-center gap-2 group"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                        i === step
                          ? "bg-[#003087] text-white"
                          : i < step
                          ? "bg-[#003087]/20 text-[#003087]"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`text-sm font-medium transition-colors ${
                        i === step ? "text-[#003087]" : i < step ? "text-[#003087]/70" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-3 transition-colors ${
                        i < step ? "bg-[#003087]/40" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ── Step 1: Form Setup ── */}
            {step === 0 && (
              <>
                {/* Form Name */}
                <div className="space-y-2">
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="text-2xl font-bold w-full border-none outline-none focus:ring-0 p-0"
                  />
                  {/* Form Description directly below title */}
                  <Textarea
                    placeholder="Brief description or instructions for submitters..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="min-h-[72px] text-sm text-muted-foreground resize-none border-dashed"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <div className="flex gap-2">
                    {(["draft", "active", "closed"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          status === s
                            ? statusConfig[s].className
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {statusConfig[s].label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div>
                  <h3 className="font-semibold mb-3">Form Fields</h3>
                  <div className="space-y-2">
                    {fields.map((field) => (
                      <div
                        key={field.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          field.enabled !== false ? "bg-white" : "bg-gray-50 opacity-60"
                        }`}
                      >
                        {field.locked ? (
                          <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move flex-shrink-0" />
                        )}
                        <Input
                          value={field.label}
                          onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                          className="h-8 flex-1 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => toggleRequired(field.id)}
                          className={`text-xs px-2 py-1 rounded border flex-shrink-0 ${
                            field.required
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                          }`}
                        >
                          Req
                        </button>
                        {!field.locked && (
                          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={field.enabled}
                              onChange={() => toggleField(field.id)}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#003087]" />
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                  <button className="text-sm text-[#003087] hover:underline mt-3 flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    Add Custom Field
                  </button>
                </div>

                {/* File Upload Settings */}
                <div>
                  <h3 className="font-semibold mb-3">File Upload Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Accepted Types</label>
                      <div className="flex flex-wrap gap-2">
                        {fileTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => toggleFileType(type)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              acceptedTypes.includes(type)
                                ? "bg-[#003087] text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Max File Size: {maxFileSize}MB
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={maxFileSize}
                        onChange={(e) => setMaxFileSize(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003087]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Max Files per Submission</label>
                      <input
                        type="number"
                        value={maxFiles}
                        onChange={(e) => setMaxFiles(parseInt(e.target.value))}
                        className="w-full border rounded-md px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── Step 2: Appearance ── */}
            {step === 1 && (
              <>
                <div>
                  <h3 className="font-semibold mb-1">Form Appearance</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customize the look of your public form.
                  </p>

                  <div className="space-y-6">
                    {/* Hero Image */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Hero Image URL</label>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={heroImageUrl}
                        onChange={(e) => setHeroImageUrl(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Background image for the form header
                      </p>
                    </div>

                    {/* Primary / Background Color */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Header Background Color
                      </label>
                      <p className="text-xs text-muted-foreground mb-3">
                        Used when no hero image is set
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {COLOR_PRESETS.map((preset) => (
                          <button
                            key={preset.value}
                            title={preset.label}
                            onClick={() => setPrimaryColor(preset.value)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              primaryColor === preset.value
                                ? "border-[#003087] scale-110 shadow-md"
                                : "border-transparent hover:scale-105"
                            }`}
                            style={{ backgroundColor: preset.value }}
                          />
                        ))}
                        <div className="relative">
                          <div
                            className={`w-8 h-8 rounded-full border-2 overflow-hidden cursor-pointer ${
                              !COLOR_PRESETS.find((p) => p.value === primaryColor)
                                ? "border-[#003087] scale-110 shadow-md"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: primaryColor }}
                          >
                            <input
                              type="color"
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded border" style={{ backgroundColor: primaryColor }} />
                        <code className="text-xs text-muted-foreground">{primaryColor.toUpperCase()}</code>
                      </div>
                    </div>

                    {/* Heading Color */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Heading Color</label>
                      <p className="text-xs text-muted-foreground mb-3">
                        Color of the form title in the header
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {HEADING_COLOR_PRESETS.map((preset) => (
                          <button
                            key={preset.value}
                            title={preset.label}
                            onClick={() => setHeadingColor(preset.value)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              headingColor === preset.value
                                ? "border-[#003087] scale-110 shadow-md"
                                : "border-gray-200 hover:scale-105"
                            }`}
                            style={{ backgroundColor: preset.value }}
                          />
                        ))}
                        <div className="relative">
                          <div
                            className={`w-8 h-8 rounded-full border-2 overflow-hidden cursor-pointer ${
                              !HEADING_COLOR_PRESETS.find((p) => p.value === headingColor)
                                ? "border-[#003087] scale-110 shadow-md"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: headingColor }}
                          >
                            <input
                              type="color"
                              value={headingColor}
                              onChange={(e) => setHeadingColor(e.target.value)}
                              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded border" style={{ backgroundColor: headingColor }} />
                        <code className="text-xs text-muted-foreground">{headingColor.toUpperCase()}</code>
                      </div>
                    </div>

                    {/* Font */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Font</label>
                      <select
                        value={font}
                        onChange={(e) => setFont(e.target.value)}
                        className="w-full border rounded-md px-3 py-2"
                      >
                        <option>System Default</option>
                        <option>Georgia</option>
                        <option>Lato</option>
                        <option>Custom Google Font</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── Step 3: Publishing ── */}
            {step === 2 && (
              <>
                {/* Form Behavior */}
                <div>
                  <h3 className="font-semibold mb-3">Form Behavior</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Success Message</label>
                      <textarea
                        value={successMessage}
                        onChange={(e) => setSuccessMessage(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 min-h-[80px]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Notification Email</label>
                      <input
                        type="email"
                        value={notificationEmail}
                        onChange={(e) => setNotificationEmail(e.target.value)}
                        placeholder="admin@education.ufl.edu"
                        className="w-full border rounded-md px-3 py-2"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Auto-reply to Submitter</label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoReply}
                          onChange={(e) => setAutoReply(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#003087]" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Publishing */}
                <div>
                  <h3 className="font-semibold mb-3">Publishing</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Published to Site</label>
                      <select
                        value={selectedSite}
                        onChange={(e) => setSelectedSite(e.target.value)}
                        className="w-full border rounded-md px-3 py-2"
                      >
                        <option>COE Main</option>
                        <option>Research Portal</option>
                        <option>Alumni Portal</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">URL Slug</label>
                      <input
                        type="text"
                        value={urlSlug}
                        onChange={(e) => setUrlSlug(e.target.value)}
                        className="w-full border rounded-md px-3 py-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        education.ufl.edu/submit/{urlSlug}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Embed Shortcode</label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-sm bg-gray-100 px-3 py-2 rounded">
                          [media_upload_form id="{formId}"]
                        </code>
                        <Button variant="ghost" size="sm">Copy</Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Live Form
                    </Button>
                    <Button className="w-full bg-[#003087] hover:bg-[#002866]">
                      Publish Form
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Step Navigation */}
          <div className="border-t px-6 py-4 flex items-center justify-between bg-white">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
            >
              Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button
                className="bg-[#003087] hover:bg-[#002866]"
                onClick={() => setStep((s) => s + 1)}
              >
                Next: {STEPS[step + 1]}
              </Button>
            ) : (
              <span className="text-sm text-muted-foreground">Last step</span>
            )}
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Preview Toggle */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPreviewMode("desktop")}
                className={`p-2 rounded ${
                  previewMode === "desktop" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                }`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreviewMode("mobile")}
                className={`p-2 rounded ${
                  previewMode === "mobile" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                }`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>

            {/* Preview Frame */}
            <div
              className={`mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${
                previewMode === "mobile" ? "max-w-md" : "max-w-3xl"
              }`}
            >
              {/* Header */}
              <div
                className="relative text-white p-8 min-h-[200px] flex flex-col justify-center"
                style={{
                  backgroundImage: heroImageUrl
                    ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImageUrl})`
                    : `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h1
                  className="text-3xl font-bold mb-3"
                  style={{ color: headingColor }}
                >
                  {formName}
                </h1>
                {formDescription && (
                  <p className="text-white/90 text-sm max-w-2xl leading-relaxed">
                    {formDescription}
                  </p>
                )}
              </div>

              {/* Form Fields Preview */}
              <div className="p-6 space-y-4 bg-gray-50">
                {fields
                  .filter((f) => f.enabled !== false)
                  .map((field) => (
                    <div key={field.id} className="bg-white p-4 rounded-lg border">
                      <label className="block text-sm font-medium mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea className="w-full border rounded-md px-3 py-2 min-h-[80px] bg-white" readOnly />
                      ) : field.type === "select" ? (
                        <select className="w-full border rounded-md px-3 py-2 bg-white" disabled>
                          <option>Select an option</option>
                        </select>
                      ) : field.type === "checkbox" ? (
                        <div className="flex items-start gap-2">
                          <input type="checkbox" className="mt-1" readOnly />
                          <span className="text-sm text-muted-foreground">
                            I agree to grant usage rights for submitted media
                          </span>
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          className="w-full border rounded-md px-3 py-2 bg-white"
                          readOnly
                        />
                      )}
                    </div>
                  ))}

                {/* Upload Zone */}
                <div className="bg-white p-4 rounded-lg border">
                  <label className="block text-sm font-medium mb-2">
                    Share your images <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                    <div className="space-y-2">
                      <div className="text-4xl">📁</div>
                      <p className="font-medium">Drag and drop files here</p>
                      <p className="text-sm text-muted-foreground">or click to browse</p>
                      <p className="text-xs text-muted-foreground">
                        Accepted: {acceptedTypes.join(", ")} · Max {maxFileSize}MB · Up to {maxFiles} files
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full py-3 rounded-md text-white font-medium text-lg transition-colors"
                  style={{ backgroundColor: primaryColor }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
