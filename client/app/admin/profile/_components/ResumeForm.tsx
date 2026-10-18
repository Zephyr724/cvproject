"use client";

import resumeApiService from "@/lib/api/resume-api-service";

export default function ResumeForm() {
  const MAX_FILE_SIZE = 4_000_000;

  async function handleSubmit(data: FormData) {
    try {
      const file = data.get("file") as File;
      console.log("File selected:", file);
      if (!(file instanceof File) || file.size === 0) {
        console.log("Please select a PDF file.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        console.log("Maximum file size is 4 MB.");
        return;
      }
      const res = await resumeApiService.create(data);
      if (res.status == 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.log("Have server error");
    }
  }
  return (
    <section className="rounded-md border border-base-300 bg-base-100 p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Update Resume</h2>

      <p className="mt-1 text-sm text-base-content/60">
        Upload a PDF resume. Uploading a new file will replace the existing one.
      </p>

      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          void handleSubmit(data);
        }}
      >
        <div className="rounded-md border border-dashed border-base-300 p-6">
          <input
            type="file"
            name="file"
            accept="application/pdf"
            className="file-input file-input-bordered w-full"
          />

          <p className="mt-2 text-xs text-base-content/60">
            PDF only. Maximum file size: 4 MB.
          </p>
        </div>

        <div className="rounded-md bg-base-200 p-4">
          <p className="text-sm font-semibold">Current resume</p>
          <p className="mt-1 text-sm text-base-content/70">sample-cv.pdf</p>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Upload Resume
          </button>
        </div>
      </form>
    </section>
  );
}
