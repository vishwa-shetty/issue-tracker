import { Box, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const IssueDetailLoading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="4">
        <Skeleton width="3rem" />
        <Skeleton width="5rem" />
      </Flex>
      <Skeleton height="15rem" />
      <Flex gap="3" my="4">
        <Skeleton width="8rem" height="2rem" />
      </Flex>
    </Box>
  );
};

export default IssueDetailLoading;
