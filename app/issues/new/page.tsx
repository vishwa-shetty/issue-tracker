import React from "react";
import dynamic from "next/dynamic";
import NewIssueLoading from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <NewIssueLoading />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
