"use client";
import {
  Button,
  Callout,
  CalloutIcon,
  Text,
  TextField,
} from "@radix-ui/themes";
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

  const onSubmit = async (data: IssueForm) => {
    console.log("enter");
    try {
      await axios.post("/api/issues", data);
      route.push("/issues");
    } catch (error) {
      setError("An unexpected error occured");
    }
  };

  return (
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
        {errors?.title && (
          <Text color="red" as="p">
            {errors?.title?.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors?.description && (
          <Text color="red" as="p">
            {errors?.description?.message}
          </Text>
        )}

        <div className="space-x-2">
          <Button>Add New Issue</Button>
          <Button color="gray" variant="outline">
            <Link href={"/"}>Back to Dashboard</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewIssuePage;
