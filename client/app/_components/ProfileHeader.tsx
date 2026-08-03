import { PublicProfile } from "@/lib/server/mappers/profile.mapper";
import { Button } from "@radix-ui/themes";
import { FaGithub, FaLinkedin, FaRegFile } from "react-icons/fa";

interface ProfileHeaderProps {
  profile: PublicProfile;
  resume?: string;
}

export default function ProfileHeader({ profile, resume }: ProfileHeaderProps) {
  return (
    <section className="flex justify-center items-center px-6 py-10 md:px-12 lg:px-20">
      <div className="max-w-5xl text-center">
        <p className="text-lg font-semibold text-base-content/60">Hi, I am</p>

        <h1 className="mt-3 text-6xl font-black leading-none tracking-tight sm:text-7xl md:text-8xl">
          {profile.displayName}
        </h1>

        <p className="mt-5 text-xl font-semibold text-base-content/60">
          {profile.headline}
        </p>

        <div className="mt-8 flex max-w-md flex-col gap-3 items-center">
          <Button asChild className="w-full">
            <a href={resume} target="_blank" rel="noopener noreferrer">
              <FaRegFile />
              Download Resume
            </a>
          </Button>
          {/* {resume && (
                <Button asChild className="w-full">
                  <a href={resume} target="_blank" rel="noopener noreferrer">
                    Download Resume
                  </a>
                </Button>
              )} */}

          <div className="flex gap-3">
            <Button asChild>
              <a href={`mailto:${profile.email}`}>Hire Me</a>
            </Button>

            {profile.github && (
              <Button asChild variant="outline">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              </Button>
            )}

            {profile.linkedin && (
              <Button asChild variant="outline">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
