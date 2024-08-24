"use client";

import { Button } from "@radix-ui/themes";
import React from "react";
import { MdDelete } from "react-icons/md";

const DeleteIssueButton = async () => {
  return (
    <Button color="red">
      <MdDelete size={18} />
      Delete
    </Button>
  );
};

export default DeleteIssueButton;
