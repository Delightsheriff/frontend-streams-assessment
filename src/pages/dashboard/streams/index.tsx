import { AskStreamInput } from "@/components/dashboard/streams/ask-stream-input";
import { PageHeader } from "@/components/dashboard/streams/page-header";
import Layout from "@/components/layouts";

export default function Streams() {
  return (
    <Layout>
      <PageHeader />
      <AskStreamInput />
    </Layout>
  );
}
