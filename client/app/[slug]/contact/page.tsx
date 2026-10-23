import { notFound } from "next/navigation";
import { profileService } from "@/lib/server/services/profile.service";
import ContactForm from "@/app/_components/ContactForm";

interface ContactPageProps {
  params: {
    slug: string;
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { slug } = await params;

  const profile = await profileService.getProfileBySlug(slug);
  if (!profile || !profile.isPublic) {
    notFound();
  }

  return (
    <div>
      {profile.email ? (
        <ContactForm email={profile.email} profileSlug={slug} />
      ) : (
        <section className="mx-auto max-w-4xl py-20">
          <p>Currently unavailable</p>
        </section>
      )}
    </div>
  );
}
