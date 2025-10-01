import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const VedioUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const router = useRouter();
  const MaxFileSize = 70 * 1024 * 1024;
  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) return;
    if (file.size > MaxFileSize) {
      alert("File is too large");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("originalSize", file.size.toString());

      try {
        const response = await axios.post("/api/video-upload", formData);
        console.log("Upload video success ", response);
      } catch (error) {
        console.log("Upload video failed ", error);
      } finally {
        setIsUploading(false);
      }
    } catch (error) {}
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
      <form onSubmit={handleFileUpload} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered  w-full"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Video-File</span>
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file-input file-input-bordered w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isUploading}
        >
          {" "}
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default VedioUpload;
