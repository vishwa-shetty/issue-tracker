import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import BackToIssueButton from "../BackToIssueButton";
import EditIssueButton from "./EditIssueButton";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="2">
      <Box>
        <Heading as="h1">{issues?.title}</Heading>
        <Flex gap="3" my="4">
          <IssueStatusBadge status={issues?.status} />
          <Text>{issues?.createdAt.toDateString()}</Text>
        </Flex>
        <Card>
          <ReactMarkdown className="prose">{issues?.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <EditIssueButton issueId={issues?.id} />
      </Box>
      <Box>
        <BackToIssueButton />
      </Box>
    </Grid>
  );
};

export default IssuesDetailsPage;
