import { ChevronDown, Sparkle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IoLogoAppleAppstore } from "react-icons/io5";
import Stack from "@/components/ui/stack";
import type { Conversation } from "@/lib/types";

interface ConversationResultsProps {
  conversation: Conversation;
}

export function ConversationResults({
  conversation,
}: ConversationResultsProps) {
  const stackCards = conversation.data.section2Cards.map((card, index) => {
    const backgrounds = [
      "bg-gradient-to-br from-indigo-50 to-blue-100",
      "bg-gradient-to-br from-purple-50 to-fuchsia-100",
      "bg-gradient-to-br from-sky-50 to-indigo-100",
      "bg-gradient-to-br from-violet-50 to-purple-100",
    ];

    return (
      <div
        key={index}
        className={`h-full w-full rounded-2xl border border-border ${
          backgrounds[index % backgrounds.length]
        } p-6`}
      >
        <h2 className="text-2xl font-semibold">{card.title}</h2>

        <div className="space-y-6">
          <h3 className="text-xl font-medium leading-relaxed">
            {card.subheading}
          </h3>
          <p className="text-[16px] leading-relaxed font-normal text-[#141232]/80">
            {card.content}
          </p>
        </div>
      </div>
    );
  });

  return (
    <main className="flex-1 overflow-auto p-10 text-[#141232]">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 rounded-lg border border-border">
        {/* Section 1 - Top Left */}
        <section className="space-y-4 border-r border-b border-border p-6">
          <h2 className="text-2xl font-semibold">Section 1</h2>
          <div className="space-y-6">
            <h3 className="text-xl font-medium leading-relaxed">
              {conversation.data.section1.title}
            </h3>
            <p className="text-[16px] leading-relaxed font-normal text-[#141232]/80">
              {conversation.data.section1.content}
            </p>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-[#EFEFFF] px-2 py-0.5 text-xs font-medium text-[#625AFA]"
              >
                <Sparkle className="h-3 w-3" fill="#625AFA" />
                Chip
              </Badge>
            </div>
          </div>
        </section>

        {/* Section 2 - Top Right */}
        <section className="space-y-4 border-b border-border p-6 h-full w-full min-h-100 sm:min-h-0">
          <Stack
            cards={stackCards}
            randomRotation={true}
            sendToBackOnClick={true}
          />
        </section>

        {/* Section 3 - Bottom Left */}
        <section className="space-y-6 border-r border-border p-6">
          <h2 className="text-2xl font-semibold">Section 3</h2>
          <div className="space-y-6">
            <h3 className="text-xl font-medium leading-relaxed">
              {conversation.data.section3.title}
            </h3>
            <p className="text-[16px] leading-relaxed font-normal text-[#141232]/80">
              {conversation.data.section3.content}
            </p>
          </div>
        </section>

        {/* Section 4 - Bottom Right - Data Sources (Scrollable) */}
        <section className="flex flex-col p-6 max-h-96">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Data Sources</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Data Source</span>
              <button className="flex items-center gap-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:bg-muted">
                All
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0 space-y-4">
            <div className="space-y-4 border-t border-border pt-4">
              {conversation.data.dataSources.map((source, index) => (
                <div
                  key={index}
                  className="border-b border-border pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {source.name}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      {source.date}
                      <IoLogoAppleAppstore size={20} />
                    </span>
                  </div>
                  <p className="text-[16px] leading-relaxed font-normal text-[#141232]/80">
                    {source.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
