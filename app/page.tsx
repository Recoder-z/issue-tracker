import LatestIssues from "./LatestIssues";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    
    <LatestIssues/>
  );
}
