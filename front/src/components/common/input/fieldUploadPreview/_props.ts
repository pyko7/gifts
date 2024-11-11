type FileUploadPreviewMode = "AVATAR" | "IMAGE";

export type FileUploadPreviewProps = {
  filePreview: string;
  onClear: () => void;
  mode?: FileUploadPreviewMode;
};
