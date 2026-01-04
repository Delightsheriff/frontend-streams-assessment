import React, { useState } from "react";
import { PageHeader } from "./page-header";
import { AskStreamInput } from "./ask-stream-input";
import { Conversation } from "@/lib/types";
import { ConversationSidebar } from "./conversation-sidebar";
import { ConversationResults } from "./conversation-results";
import conversationsData from "@/lib/conversations.json";

export default function StreamLayout() {
  const [conversations, setConversations] = useState<Conversation[]>(
    conversationsData.conversations as Conversation[]
  );
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const toggleBookmark = (id: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id ? { ...conv, isBookmarked: !conv.isBookmarked } : conv
      )
    );
  };

  const handleCreateConversation = (query: string) => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: query,
      timestamp: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      isBookmarked: false,
      data: {
        section1: {
          title: `Analysis for: ${query}`,
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        section2Cards: [
          {
            title: "Key Insight 1",
            subheading: "Analysis Result",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
          },
          {
            title: "Key Insight 2",
            subheading: "Analysis Result",
            content:
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
          },
        ],
        section3: {
          title: "Summary",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
        },
        dataSources: [
          {
            name: "Data Source 1",
            date: new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....",
          },
        ],
      },
    };

    setConversations((prev) => [newConversation, ...prev]);
    setSelectedConversation(newConversation);
  };
  return (
    <>
      <PageHeader />
      <AskStreamInput onAnalyze={handleCreateConversation} />
      <div className="flex flex-col border-t border-border lg:flex-row">
        <ConversationSidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
          onToggleBookmark={toggleBookmark}
        />
        {selectedConversation ? (
          <ConversationResults conversation={selectedConversation} />
        ) : (
          <div className="flex flex-1 items-center justify-center p-10 text-muted-foreground">
            <p className="text-sm">Select a conversation to view results</p>
          </div>
        )}
      </div>
    </>
  );
}
