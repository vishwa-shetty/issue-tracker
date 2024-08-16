import { Box, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const NewIssueLoading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton />
      <Skeleton height="15rem" />
      <Flex gap="3">
        <Skeleton width="5rem" />
        <Skeleton width="5rem" />
      </Flex>
    </Box>
  );
};

export default NewIssueLoading;
