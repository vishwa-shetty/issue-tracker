import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
    <div className="max-w-xl">
      <Heading as="h1">{issues?.title}</Heading>
      <Grid columns="2" gap="3">
        <Box>
          <Flex gap="3" my="4">
            <IssueStatusBadge status={issues?.status} />
            <Text>{issues?.createdAt.toDateString()}</Text>
          </Flex>
        </Box>
        <Box>
          <Button variant="outline" my="4">
            <Link href={`/issues/edit/${issues.id}`}>Edit Issues</Link>
          </Button>
        </Box>
      </Grid>

      <Card>
        <ReactMarkdown className="prose">{issues?.description}</ReactMarkdown>
      </Card>
      <Button color="gray" variant="outline" my="4">
        <Link href={"/issues"}>Back To Issues</Link>
      </Button>
    </div>
  );
};

export default IssuesDetailsPage;
