import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkle } from "lucide-react";

interface AskStreamInputProps {
  onAnalyze?: (query: string) => void;
}

export function AskStreamInput({ onAnalyze }: AskStreamInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const suggestions: string[] = [
    "Excepteur sint occaecat cupidatat?",
    "Excepteur sint occaecat cupidatat?",
  ];

  const handleAnalyze = () => {
    if (inputValue.trim()) {
      console.log(inputValue);
      onAnalyze?.(inputValue);
      setInputValue("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      handleAnalyze();
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12 lg:py-16">
      <div
        className={`mb-8 overflow-hidden transition-all duration-400 ease-in-out md:mb-12 ${
          inputValue ? "max-h-0 opacity-0" : "max-h-40 opacity-100"
        }`}
      >
        <h1
          className="bg-linear-to-r from-[#625AFA] to-[#272464] bg-clip-text text-4xl font-semibold text-transparent md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-brico)" }}
        >
          Ask Stream
        </h1>
        <h2
          style={{ fontFamily: "var(--font-brico)" }}
          className="mt-2 text-4xl font-semibold text-[#CAC4D0] md:text-5xl lg:text-6xl"
        >
          lorem ipsum
        </h2>
      </div>

      <div className="relative">
        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background px-4 py-4 shadow-sm transition-shadow focus-within:border-ring focus-within:shadow-lg md:px-5 md:py-5">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <input
              type="text"
              placeholder="Ask anything"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border-0 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none md:text-lg"
            />
            <div className="mt-5 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-[#EFEFFF] px-2 py-0.5 text-xs font-medium text-[#625AFA]"
              >
                <Sparkle className="h-3 w-3" fill="#625AFA" />
                Beta
              </Badge>
              <span className="text-xs text-[#CAC4D0] md:text-sm">
                Conversational Analytics
              </span>
            </div>
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={!inputValue.trim()}
            size="default"
            className="shrink-0 cursor-pointer rounded-sm bg-[#141232] text-sm font-medium text-white hover:bg-[#1f1b4a] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Analyze
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-3 text-left text-sm text-foreground shadow-sm transition-all hover:border-muted-foreground/40 hover:bg-muted/50 hover:shadow-md md:px-5 md:py-4 md:text-base"
          >
            <span className="text-[#141232]/60">{suggestion}</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#141232]/60 transition-transform group-hover:translate-x-1" />
          </button>
        ))}
      </div>
    </div>
  );
}
