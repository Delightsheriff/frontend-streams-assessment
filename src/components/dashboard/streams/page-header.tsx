import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function PageHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-4 py-3 md:px-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-1 text-sm font-normal text-muted-foreground hover:text-foreground md:text-base"
          >
            Ask Stream
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem>Stream 1</DropdownMenuItem>
          <DropdownMenuItem>Stream 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        className="text-sm font-normal text-muted-foreground hover:text-foreground md:text-base"
      >
        Show History
      </Button>
    </header>
  );
}
