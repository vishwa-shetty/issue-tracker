"use client";
import {
  Button,
  Callout,
  CalloutIcon,
  Heading,
  TextField,
} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdError } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { Spinner, ErrorMessages } from "@/app/components";
import { Issue } from "@prisma/client";
import BackToIssueButton from "../BackToIssueButton";
import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const route = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (data: IssueFormData) => {
    try {
      setSubmitting(true);
      if (!issue) {
        await axios.post("/api/issues", data);
      } else {
        await axios.patch(`/api/issues/${issue?.id}`, data);
      }
      setSubmitting(false);
      route.push("/issues");
      route.refresh();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured");
    }
  };
  return (
    <>
      <div className="max-w-lg space-y-4">
        {error && (
          <Callout.Root color="red">
            <CalloutIcon>
              <MdError />
            </CalloutIcon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Heading>{!issue ? "Add New Issue" : "Edit this issue"}</Heading>
          <TextField.Root>
            <TextField.Input
              defaultValue={issue?.title}
              placeholder="Title"
              {...register("title")}
            />
          </TextField.Root>
          <ErrorMessages>{errors?.title?.message}</ErrorMessages>
          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <ErrorMessages>{errors?.description?.message}</ErrorMessages>
          <div className="space-x-2">
            <Button disabled={isSubmitting}>
              {!issue ? "Add New Issue" : "Edit this issue"}
              {isSubmitting && <Spinner />}
            </Button>
            <BackToIssueButton />
          </div>
        </form>
      </div>
    </>
  );
};

export default IssueForm;
