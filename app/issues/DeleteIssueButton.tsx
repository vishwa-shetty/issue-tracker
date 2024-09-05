"use client";

import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Spinner } from "../components";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  console.log("issueid", issueId);
  const [isError, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch {
      setError(true);
      setDeleting(false);
    }
  };

  const handleCloseErrorDialog = () => {
    setError(false);
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <Button color="red" disabled={isDeleting}>
            {isDeleting ? <Spinner /> : <MdDelete size={18} />}
            Delete
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Are you absolutely sure?
            </AlertDialog.Title>
            <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
              This action cannot be undone. This will permanently delete issue
              data from our server.
            </AlertDialog.Description>
            <div className="flex justify-end gap-[25px]">
              <AlertDialog.Cancel asChild>
                <Button
                  color="blue"
                  style={{ padding: "8px 20px", borderRadius: "5px" }}
                >
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button
                  color="red"
                  style={{ padding: "8px 20px", borderRadius: "5px" }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
      {isError && (
        <AlertDialog.Root open={isError} onOpenChange={handleCloseErrorDialog}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Something Went Wrong.
              </AlertDialog.Title>
              <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                Please try again later.
              </AlertDialog.Description>
              <AlertDialog.Cancel asChild>
                <Button
                  color="blue"
                  style={{ padding: "8px 20px", borderRadius: "5px" }}
                >
                  Ok
                </Button>
              </AlertDialog.Cancel>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      )}
    </>
  );
};

export default DeleteIssueButton;
