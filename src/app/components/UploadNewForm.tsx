import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Upload, X, CheckCircle, ChevronDown, ChevronUp, Copy } from "lucide-react";

interface UploadNewFormProps {
  onSuccess: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  error?: string;
}

export function UploadNewForm({ onSuccess }: UploadNewFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showApiReference, setShowApiReference] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      progress: 100, // Simulate complete upload
      error: file.size > 10 * 1024 * 1024 ? "File exceeds 10MB limit" : undefined,
    }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-xl font-medium mb-2">Submission received!</h2>
        <p className="text-muted-foreground mb-6">The team has been notified.</p>
        <Button
          variant="link"
          onClick={() => {
            setShowSuccess(false);
            setUploadedFiles([]);
          }}
        >
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* API Reference Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg">
        <button
          onClick={() => setShowApiReference(!showApiReference)}
          className="w-full flex items-center justify-between p-3 hover:bg-blue-100 transition-colors"
        >
          <span className="text-sm font-medium text-blue-900">API Reference</span>
          {showApiReference ? (
            <ChevronUp className="h-4 w-4 text-blue-700" />
          ) : (
            <ChevronDown className="h-4 w-4 text-blue-700" />
          )}
        </button>

        {showApiReference && (
          <div className="border-t border-blue-200 p-4 space-y-3">
            <div className="space-y-2">
              <p className="text-xs font-medium text-blue-900">Submit Media</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs bg-white px-3 py-2 rounded border">
                  POST /wp-json/team-media/v1/submit
                </code>
                <Button size="sm" variant="ghost" className="flex-shrink-0">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-blue-900">Get Upload Details</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs bg-white px-3 py-2 rounded border">
                  GET /wp-json/team-media/v1/upload-details
                </code>
                <Button size="sm" variant="ghost" className="flex-shrink-0">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Submission Details */}
        <div className="bg-white border rounded-lg p-6 space-y-4">
          <h3 className="font-medium">Submission Details</h3>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-red-600">*</span>
            </label>
            <Input id="title" placeholder="Enter submission title" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Provide context about this submission"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category <span className="text-red-600">*</span>
            </label>
            <Select required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="research">Research Events</SelectItem>
                <SelectItem value="faculty">Faculty Resources</SelectItem>
                <SelectItem value="student">Student Life</SelectItem>
                <SelectItem value="alumni">Alumni Relations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="submitter-name" className="text-sm font-medium">
                Submitter Name <span className="text-red-600">*</span>
              </label>
              <Input id="submitter-name" placeholder="Full name" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="submitter-email" className="text-sm font-medium">
                Submitter Email <span className="text-red-600">*</span>
              </label>
              <Input
                id="submitter-email"
                type="email"
                placeholder="email@ufl.edu"
                required
              />
            </div>
          </div>
        </div>

        {/* Upload Files */}
        <div className="bg-white border rounded-lg p-6 space-y-4">
          <h3 className="font-medium">Upload Files</h3>

          {/* Drag and Drop Zone */}
          <label
            htmlFor="file-upload"
            className="border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#003087] hover:bg-blue-50 transition-colors"
          >
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm font-medium mb-1">
              Drag photos or videos here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              Accepted formats: JPG, PNG, GIF, MP4, MOV, AVI
            </p>
            <p className="text-xs text-muted-foreground">Max file size: 10MB per file</p>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </label>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className={`border rounded-lg p-3 ${
                    file.error ? "border-red-300 bg-red-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                  {file.error ? (
                    <p className="text-xs text-red-600">{file.error}</p>
                  ) : (
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-[#003087] hover:bg-[#002866] h-12"
          disabled={uploadedFiles.length === 0 || uploadedFiles.some((f) => f.error)}
        >
          Submit Media
        </Button>
      </form>
    </div>
  );
}
