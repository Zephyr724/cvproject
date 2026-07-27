"use client";
import YearBadge from "@/app/components/YearBadge/YearBadge";
import { Education } from "@/app/admin/education/types";
import { useState } from "react";
import TiptapRenderer from "@/lib/tiptap/extensions/TiptapRenderer";
import { JSONContent } from "@tiptap/react";
import EditDeleteButtons from "./EditDeleteButtons";
import EducationForm from "../admin/education/_components/EducationForm";

interface EducationCardProps {
  education: Education;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

function EducationCard({
  education,
  showActions = false,
  onDelete,
}: EducationCardProps) {
  const [showEditForm, setShowEditForm] = useState(false);

  if (showEditForm) {
    return (
      <EducationForm
        education={education}
        educationId={education.id}
        onCancel={() => setShowEditForm(false)}
        onSuccess={() => setShowEditForm(false)}
      />
    );
  }
  return (
    <div key={education.id}>
      <div className="card card-border bg-neutral-content shadow-xl border boderder-neutral/20 m-2 ">
        <div className="card-body">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="card-title">{education.degree}</h2>
              <p className="text-sm font-semibold text-slate-400">
                {education.institution}
              </p>
            </div>

            <YearBadge
              startDate={education.startDate}
              endDate={education.endDate}
            />
          </div>
          <TiptapRenderer
            content={education.description as JSONContent}
            isProject={false}
          />

          {showActions && (
            <EditDeleteButtons
              onEdit={() => setShowEditForm(true)}
              onDelete={onDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EducationCard;
