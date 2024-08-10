import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssuesDetailsPage = async ({ params }: Props) => {
  if (typeof parseInt(params?.id) !== "number") notFound();

  const issues = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issues) notFound();

  return (
    <div>
      <Heading as="h1">{issues?.title}</Heading>
      <Flex gap="3" my="4">
        <IssueStatusBadge status={issues?.status} />
        <Text>{issues?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{issues?.description}</Card>
    </div>
  );
};

export default IssuesDetailsPage;
