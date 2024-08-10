import prisma from "@/prisma/client";
import React from "react";

interface Props {
  params: { id: string };
}

const IssuesDetailsPage = async ({ params }: Props) => {
  const issues = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  return (
    <div>
      <p>{issues?.title}</p>
      <p>{issues?.status}</p>
      <p>{issues?.description}</p>
      <p>{issues?.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssuesDetailsPage;
