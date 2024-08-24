import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetailsPage = ({ issues }: { issues: Issue }) => {
  return (
    <>
      <Heading as="h1">{issues?.title}</Heading>
      <Flex gap="3" my="4">
        <IssueStatusBadge status={issues?.status} />
        <Text>{issues?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <ReactMarkdown className="prose">{issues?.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetailsPage;
