import { Button } from "@radix-ui/themes";
import Link from "next/link";

const AdminProjectPage = () => {
  return (
    <div>
      <div>AdminProjectPage</div>
      <Button asChild color="green">
        <Link href="/admin/projects/new" color="green">
          New Project
        </Link>
      </Button>
      <Button>
        <Link href="/admin/projects/1/edit">Update Project</Link>
      </Button>
    </div>
  );
};

export default AdminProjectPage;
