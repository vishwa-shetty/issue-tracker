import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import BackToIssueButton from "../BackToIssueButton";
import DeleteIssueButton from "../DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetailsPage from "./IssueDetailsPage";

interface Props {
  params: { id: string };
}

const IssuesDetails = async ({ params }: Props) => {
  if (typeof parseInt(params?.id) !== "number") notFound();

  const issues = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issues) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="2">
      <Box>
        <IssueDetailsPage issues={issues} />
      </Box>
      <Box className="max-w-sm">
        <Flex direction="column" gap="2">
          <EditIssueButton issueId={issues?.id} />
          <DeleteIssueButton />
          <BackToIssueButton />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssuesDetails;
