import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "context", label: "Context" },
  { id: "solution", label: "Solution" },
  { id: "integration", label: "Architecture" },
  { id: "investment", label: "Investment" },
];

const SECTION_IDS = NAV_ITEMS.map((i) => i.id);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14">
        <button type="button" onClick={() => scrollTo("hero")} className="text-primary-foreground font-semibold text-lg tracking-tight">
          Factorial
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={cn(
                "px-3 py-1.5 text-xs tracking-wide transition-colors rounded-sm",
                activeId === item.id ? "text-primary-foreground bg-primary-foreground/15" : "text-primary-foreground/60 hover:text-primary-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-primary-foreground" aria-label="Toggle menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden bg-primary border-t border-primary-foreground/10 px-6 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={cn(
                "block w-full text-left px-4 py-2.5 text-sm tracking-wide transition-colors rounded-sm",
                activeId === item.id ? "text-primary-foreground bg-primary-foreground/15" : "text-primary-foreground/60 hover:text-primary-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
