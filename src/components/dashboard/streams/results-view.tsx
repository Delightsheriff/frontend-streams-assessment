import { useState } from "react";
import { ChevronDown, ChevronRight, Sparkle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IoLogoAppleAppstore } from "react-icons/io5";
import { bookmarkResults, bookmarks, historyData } from "@/pages/api/data";
import Stack from "@/components/ui/stack";

export function ResultsView() {
  const [selectedBookmark, setSelectedBookmark] = useState<string | null>("1");
  const [expandedSections, setExpandedSections] = useState({
    today: false,
    last7days: false,
    november: true,
  });

  const currentResults = selectedBookmark
    ? bookmarkResults[selectedBookmark as keyof typeof bookmarkResults]
    : bookmarkResults["1"];

  const toggleSection = (section: "today" | "last7days" | "november") => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const stackCards = currentResults.section2Cards.map((card, index) => {
    const backgrounds = [
      "bg-gradient-to-br from-indigo-50 to-blue-100",
      "bg-gradient-to-br from-purple-50 to-fuchsia-100",
      "bg-gradient-to-br from-sky-50 to-indigo-100",
      "bg-gradient-to-br from-violet-50 to-purple-100",
    ];

    return (
      <div
        key={index}
        className={`flex flex-col gap-6 h-full w-full  rounded-2xl border border-border ${
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
    <div className="flex flex-col border-t border-border lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden w-56  border-r border-border bg-background lg:block">
        <div className="flex h-full flex-col p-4">
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {/* Bookmarks Section */}
            <div className="mb-6">
              <h3 className="mb-3 px-2 text-xs font-medium text-muted-foreground">
                Bookmarks
              </h3>
              <div className="space-y-0.5">
                {bookmarks.map((bookmark) => (
                  <button
                    key={bookmark.id}
                    onClick={() => setSelectedBookmark(bookmark.id)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted ${
                      selectedBookmark === bookmark.id ? "bg-muted" : ""
                    }`}
                  >
                    {bookmark.title}
                  </button>
                ))}
              </div>
            </div>

            {/* History Section */}
            <div>
              <h3 className="mb-3 px-2 text-xs font-medium text-muted-foreground">
                History
              </h3>
              <div className="space-y-0.5">
                {/* Today */}
                <div>
                  <button
                    onClick={() => toggleSection("today")}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <span>Today</span>
                    {expandedSections.today ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedSections.today && (
                    <div className="ml-3 mt-1 space-y-0.5 border-l border-border pl-3">
                      {historyData.today.map((item) => (
                        <button
                          key={item.id}
                          className="w-full rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Last 7 days */}
                <div>
                  <button
                    onClick={() => toggleSection("last7days")}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <span>Last 7 days</span>
                    {expandedSections.last7days ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedSections.last7days && (
                    <div className="ml-3 mt-1 space-y-0.5 border-l border-border pl-3">
                      {historyData.last7days.map((item) => (
                        <button
                          key={item.id}
                          className="w-full rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* November */}
                <div>
                  <button
                    onClick={() => toggleSection("november")}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <span>November</span>
                    {expandedSections.november ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedSections.november && (
                    <div className="ml-3 mt-1 space-y-0.5 border-l border-border pl-3">
                      {historyData.november.map((item) => (
                        <button
                          key={item.id}
                          className="w-full rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Beta Badge - pinned to bottom */}
          <div className="mt-auto border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-[#EFEFFF] px-2 py-0.5 text-xs font-medium text-[#625AFA]"
              >
                <Sparkle className="h-3 w-3" fill="#625AFA" />
                Beta
              </Badge>
              <span className="text-xs text-[#CAC4D0]">
                Conversational Analytics
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-10 text-[#141232]">
        <div className="grid grid-cols-2 grid-rows-2 rounded-lg border border-border">
          {/* Section 1 - Top Left */}
          <section className="space-y-4 border-r border-b border-border p-6">
            <h2 className="text-2xl font-semibold">Section 1</h2>
            <div className="space-y-6">
              <h3 className="text-xl font-medium leading-relaxed">
                {currentResults.section1.title}
              </h3>
              <p className="text-[16px] leading-relaxed font-normal text-[#141232]/80">
                {currentResults.section1.content}
              </p>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                >
                  Chip
                </Badge>
              </div>
            </div>
          </section>

          {/* Section 2 - Top Right */}
          <section className="space-y-4 border-b border-border p-6 h-full w-f">
            <Stack
              cards={stackCards}
              randomRotation={true}
              sendToBackOnClick={true}
            />
          </section>

          {/* Section 3 - Bottom Left */}
          <section className="space-y-6 border-r border-border p-6">
            <h2 className="text-2xl font-semibold"> Section 3</h2>
            <div className="space-y-6">
              <h3 className="text-xl font-medium leading-relaxed">
                {currentResults.section1.title}
              </h3>
              <p className="text-[16px] leading-relaxed font-normal text-[#141232]/80">
                {currentResults.section1.content}
              </p>
            </div>
          </section>

          {/* Section 4 - Bottom Right - Data Sources (Scrollable) */}
          <section className="flex flex-col p-6 max-h-96">
            <div className="flex items-center justify-between mb-4 ">
              <h2 className="text-2xl font-semibold">Data Sources</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Data Source
                </span>
                <button className="flex items-center gap-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:bg-muted">
                  All
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 space-y-4">
              <div className="space-y-4 border-t border-border pt-4">
                {currentResults.dataSources.map((source, index) => (
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
                        {/* <User className="h-3 w-3" /> */}
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
    </div>
  );
}
