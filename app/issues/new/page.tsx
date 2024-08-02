"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const route = useRouter();
  return (
    <form
      className="max-w-lg space-y-4"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("http://localhost:3000/api/issues", data);
        route.push("/");
      })}
    >
      <h1>Add New Issue</h1>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <div className="space-x-2">
        <Button>Add New Issue</Button>
        <Button color="gray" variant="outline">
          <Link href={"/"}>Back to Dashboard</Link>
        </Button>
      </div>
    </form>
  );
};

export default NewIssuePage;
