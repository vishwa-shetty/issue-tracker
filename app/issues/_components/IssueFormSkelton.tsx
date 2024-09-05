import { Box, Flex } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

const IssueFormSkelton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="3rem" />
      <Skeleton height="15rem" />
      <Flex gap="3">
        <Skeleton height="2rem" width="9rem" />
        <Skeleton height="2rem" width="9rem" />
      </Flex>
    </Box>
  );
};

export default IssueFormSkelton;
