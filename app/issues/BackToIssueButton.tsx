import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const BackToIssueButton = () => {
  return (
    <Button color="gray" variant="outline">
      <DoubleArrowLeftIcon />
      <Link href={"/issues"}>Back To Issues</Link>
    </Button>
  );
};

export default BackToIssueButton;
