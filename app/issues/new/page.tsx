"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-lg space-y-4">
      <h1>Add New Issue</h1>
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="description" />
      <div className="space-x-2">
        <Button>Add New Issue</Button>
        <Button color="gray" variant="outline">
          <Link href={"/"}>Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NewIssuePage;
