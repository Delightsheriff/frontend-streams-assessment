import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronRight,
  Sparkle,
  Bookmark,
  Link2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import type { Conversation } from "@/lib/types";

interface ConversationSidebarProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  onToggleBookmark: (id: string) => void;
}

export function ConversationSidebar({
  conversations,
  selectedConversation,
  onSelectConversation,
  onToggleBookmark,
}: ConversationSidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    today: false,
    last7days: false,
    november: true,
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const bookmarkedConversations = useMemo(
    () => conversations.filter((conv) => conv.isBookmarked),
    [conversations]
  );

  const todayConversations = useMemo(
    () =>
      conversations.filter((conv) => conv.timestamp.includes("November 25")),
    [conversations]
  );

  const last7daysConversations = useMemo(
    () =>
      conversations.filter(
        (conv) =>
          conv.timestamp.includes("November 24") ||
          conv.timestamp.includes("November 23") ||
          conv.timestamp.includes("November 22")
      ),
    [conversations]
  );

  const novemberConversations = useMemo(
    () =>
      conversations.filter(
        (conv) =>
          conv.timestamp.includes("November 20") ||
          conv.timestamp.includes("November 19") ||
          conv.timestamp.includes("November 18") ||
          conv.timestamp.includes("November 17")
      ),
    [conversations]
  );

  const toggleSection = (section: "today" | "last7days" | "november") => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  /**
   * Renders an individual conversation item.
   * Changed from <button> to <div> to avoid "Hydration Mismatch" caused by nested buttons.
   */
  const renderConversationItem = (conversation: Conversation) => (
    <div
      key={conversation.id}
      onClick={() => {
        onSelectConversation(conversation);
        setMobileOpen(false);
      }}
      onMouseEnter={() => setHoveredId(conversation.id)}
      onMouseLeave={() => setHoveredId(null)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectConversation(conversation);
          setMobileOpen(false);
        }
      }}
      className={`w-full cursor-pointer font-normal text-[#4F566B] rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-[#EFEFFF] flex items-center justify-between gap-2 group ${
        selectedConversation?.id === conversation.id ? "bg-[#EFEFFF]" : ""
      }`}
    >
      <span className="truncate">{conversation.title}</span>
      {(hoveredId === conversation.id || conversation.isBookmarked) && (
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(conversation.id);
            }}
            className="p-1 rounded hover:bg-white/50 transition-colors"
            aria-label={
              conversation.isBookmarked ? "Remove bookmark" : "Add bookmark"
            }
          >
            <Bookmark
              className={`h-3.5 w-3.5 ${
                conversation.isBookmarked
                  ? "fill-[#625AFA] text-[#625AFA]"
                  : "text-[#4F566B]"
              }`}
            />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-1 rounded hover:bg-white/50 transition-colors"
            aria-label="Share conversation"
          >
            <Link2 className="h-3.5 w-3.5 text-[#4F566B]" />
          </button>
        </div>
      )}
    </div>
  );

  /**
   * Sidebar content stored as a variable to prevent the "component created during render" error.
   */
  const sidebarContent = (
    <div className="flex h-full flex-col p-4">
      <div className="flex-1 overflow-y-auto">
        {/* Bookmarks Section */}
        <div className="mb-6">
          <h3 className="mb-3 px-2 text-xs font-medium text-muted-foreground">
            Bookmarks
          </h3>
          <div className="space-y-0.5">
            {bookmarkedConversations.length === 0 ? (
              <p className="px-3 py-2 text-xs text-muted-foreground">
                No bookmarks yet
              </p>
            ) : (
              bookmarkedConversations.map(renderConversationItem)
            )}
          </div>
        </div>

        {/* History Section */}
        <div>
          <h3 className="mb-3 px-2 text-xs font-medium text-muted-foreground">
            History
          </h3>
          <div className="space-y-0.5">
            {todayConversations.length > 0 && (
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
                    {todayConversations.map(renderConversationItem)}
                  </div>
                )}
              </div>
            )}

            {last7daysConversations.length > 0 && (
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
                    {last7daysConversations.map(renderConversationItem)}
                  </div>
                )}
              </div>
            )}

            {novemberConversations.length > 0 && (
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
                    {novemberConversations.map(renderConversationItem)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Beta Badge */}
      <div className="mt-auto border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-[#EFEFFF] px-2 py-0.5 text-xs font-medium text-[#625AFA]"
          >
            <Sparkle className="h-3 w-3" fill="#625AFA" />
            Beta
          </Badge>
          <span className="text-xs text-[#CAC4D0]">Knowledge Base</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-56 border-r border-border bg-background lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <button
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#625AFA] text-white shadow-lg transition-transform hover:scale-105 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
