Design a "Media Library" tool page for a UF College of Education CMS Suite.
Dark navy sidebar (suite nav), white content area, UF blue #003087 primary actions.

This is a form builder + submission manager. Admins build public-facing 
upload forms for external users (students, faculty, community) to submit 
photos and videos. Admins then review submissions in the gallery.
There is NO "Upload New" button — admins never upload directly.

---
TOP-LEVEL TABS (below page title):
"Forms" (default) · "Submissions Gallery"
---

=== FORMS TAB ===

Page header:
- Title "Media Library" + subtitle "Create and manage media collection forms"
- Top right: "+ New Form" primary button (UF blue)

Form list — each form is a card in a vertical list:

Each card contains:
Left section:
- Form name in bold (e.g. "Spring 2025 Campus Photo Drive")
- URL slug shown below: education.ufl.edu/submit/campus-photos (with copy icon)
- Status badge: green "Active" / gray "Draft" / red "Closed"
- Tag: which site it's published to

Center section:
- "156 submissions" stat
- "Last submission: 2 hours ago"
- Form fields summary: "6 fields · Images + Video · 10MB max"

Right section:
- "Edit Form" ghost button
- "View Submissions" ghost button  
- "Share Link" icon button
- "..." overflow: Duplicate, Archive, Delete

Empty state (no forms yet):
- Centered illustration of a form with upload icon
- "No forms yet" heading
- "Create your first media collection form" subtext
- "+ New Form" button

---

=== FORM EDITOR (full page, opens when clicking New Form or Edit Form) ===

Split-panel layout:

LEFT PANEL (40%) — Form Builder:

Top: Form name input (inline editable, large text)
Status toggle: Draft / Active / Closed

Section "Form Fields":
- Draggable field rows, each showing:
  field icon · field label · Required toggle · "..." edit/delete
  
Default fields (locked, cannot remove):
  [lock icon] Submitter Name · Required
  [lock icon] Submitter Email · Required

Optional fields (toggleable):
  [toggle] Title / Caption
  [toggle] Description  
  [toggle] Category (shows dropdown config if on)
  [toggle] Department / School
  [toggle] Date of Media (date picker for when photo was taken)
  [toggle] Usage Rights Agreement (checkbox + custom text)
  [toggle] Custom Field (text input, opens label editor)

"+ Add Custom Field" link at bottom

Section "File Upload Settings":
- Accepted types: pill toggles — JPG · PNG · GIF · MP4 · MOV · AVI
- Max file size: slider 1MB–50MB, shows selected value
- Max files per submission: number input (default 10)
- Multiple files: on/off toggle

Section "Form Behavior":
- Success message: textarea ("Thank you for your submission!")
- Notification email: input (who gets alerted on new submission)
- Auto-reply to submitter: toggle + email template textarea
- Submission deadline: optional date picker

Section "Publishing":
- Published to site: dropdown (select from 52 sites)
- URL slug: editable input + preview of full URL
- Embed shortcode: [media_upload_form id="3"] with copy button
- "View Live Form" external link button

RIGHT PANEL (60%) — Live Preview:

Tab row: Desktop · Mobile (toggle preview size)

Rendered preview of the form as an external user would see it:
- UF College of Education header/branding
- Form title as H1
- Fields rendered in order matching left panel
- Drag-and-drop upload zone at bottom
- Submit button

Branding section below preview (collapsible "Form Appearance"):
- Primary color picker (default UF blue)
- Font selector: dropdown with 4 options 
  (System Default / Georgia / Inter / Custom Google Font input)
- Show UF logo: toggle
- Header image: URL input + preview thumbnail
- Button label: text input (default "Submit")
- Form width: Narrow / Standard / Wide selector

Save behavior:
- Top bar: "All changes saved" autosave indicator (same as Program Directory)
- "Save Draft" ghost button + "Publish Form" primary button

---

=== SUBMISSIONS GALLERY TAB ===

Page header:
- Title "Submissions" + subtitle "Media submitted through your forms"
- Filter row: Form selector dropdown · Category · File Type (All/Images/Videos) · 
  Date range · Status (All / New / Reviewed / Approved / Rejected)
- Right: "Export Selected" ghost button · Bulk select checkbox

Masonry image grid:
Each card:
- Thumbnail (image) or dark card with play icon (video)
- Hover state: checkbox top-left, action icons bottom-right (Approve · Reject · Download)
- Below: submission title, submitter name, form name tag, date
- Status dot top-right: blue=New, green=Approved, red=Rejected, gray=Reviewed

Click card → right drawer slides in (380px):
- Large image preview or embedded video player
- Status badge + dropdown to change (New / Reviewed / Approved / Rejected)
- Submitter: name + email (mailto link)
- Submitted via: form name + link to that form
- Category, date of media if collected
- All files: list with filename, size, individual download link
- "Download All as ZIP" button
- Internal Notes: text area for admin comments (not visible to submitter)
- "Send to Editorial Calendar" button — creates a content task
- "Flag for Review" button

Bulk action bar when items checked:
- "X selected" · Download ZIP · Approve · Reject · Move Category

---

SUITE NAVIGATION (left sidebar, unchanged from existing):
Analytics
Publish: Editorial Calendar · Content Review
Experiments: A/B Tests · Feature Flags · Results
Governance: SEO Health · Accessibility Audit · Activity Log
Management: Roles & Permissions · Themes & Plugins
Tools: Media Library (active) · Performance · Documentation · 
       Integrations · Settings
SWITCH APP row at bottom (suite icons)

Media Library is its own standalone app page — 
NOT nested inside Network Manager's main navigation as a sub-tool.
Suite top bar: UF logo · app switcher (waffle) · breadcrumb · 
global search · notification bell · user avatar.