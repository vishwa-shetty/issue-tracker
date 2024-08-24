import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button variant="outline" my="2">
      <Pencil2Icon />
      <Link href={`/issues/edit/${issueId}`}>Edit Issues</Link>
    </Button>
  );
};

export default EditIssueButton;
