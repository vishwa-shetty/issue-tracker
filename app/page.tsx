import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <Button>
      <Link href={"/issues/new"}>Add New Issue</Link>
    </Button>
  );
}
