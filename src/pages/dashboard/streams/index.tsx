import { AskStreamInput } from "@/components/dashboard/streams/ask-stream-input";
import { PageHeader } from "@/components/dashboard/streams/page-header";
import { ResultsView } from "@/components/dashboard/streams/results-view";
import Layout from "@/components/layouts";

export default function Streams() {
  return (
    <Layout>
      <PageHeader />
      <AskStreamInput />
      <ResultsView />
    </Layout>
  );
}
