import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge, Link } from "@/app/components";
import IssueActions from "./IssueActions";
import { Status, Issue } from "@prisma/client";

interface Props {
  searchParams: { status: string };
}
const IssuesPage = async ({ searchParams }: Props) => {
  let issues: Issue[] = [];
  if (
    searchParams.status === "unassigned" ||
    searchParams.status === undefined
  ) {
    issues = await prisma.issue.findMany();
  } else {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status as Status)
      ? (searchParams.status as Status)
      : undefined;

    console.log(status);
    issues = await prisma.issue.findMany({
      where: {
        status: status,
      },
    });
  }

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                </div>
              </Table.Cell>
              <Table.Cell
                //hidden by default, handle for phone size
                className="hidden md:table-cell"
              >
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export const dynamic = "force-dynamic";
export default IssuesPage;
