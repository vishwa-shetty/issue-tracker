"use client";
import { Button, Callout, CalloutIcon, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdError } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessages from "@/app/components/ErrorMessages";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const route = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (data: IssueForm) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      setSubmitting(false);
      route.push("/issues");
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
          <h1>Add New Issue</h1>
          <TextField.Root>
            <TextField.Input placeholder="Title" {...register("title")} />
          </TextField.Root>
          <ErrorMessages>{errors?.title?.message}</ErrorMessages>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <ErrorMessages>{errors?.description?.message}</ErrorMessages>
          <div className="space-x-2">
            <Button disabled={isSubmitting}>
              Add New Issue {isSubmitting && <Spinner />}
            </Button>
            <Button color="gray" variant="outline">
              <Link href={"/"}>Back to Dashboard</Link>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewIssuePage;
