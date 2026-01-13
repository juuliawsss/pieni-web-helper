import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddTodoFormProps {
  onAdd: (text: string, priority: "low" | "medium" | "high") => void;
}

const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), priority);
      setText("");
    }
  };

  const priorities: { value: "low" | "medium" | "high"; label: string }[] = [
    { value: "low", label: "Matala" },
    { value: "medium", label: "Normaali" },
    { value: "high", label: "Korkea" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div
        className={cn(
          "relative flex items-center gap-3 p-4 rounded-xl border transition-all duration-300",
          "bg-card/30 border-border/50",
          isFocused && "border-gold/50 glow-gold"
        )}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Lisää uusi tehtävä..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/50 outline-none font-light tracking-wide"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className={cn(
            "p-2 rounded-lg transition-all duration-300",
            "bg-gold/10 text-gold hover:bg-gold hover:text-primary-foreground",
            "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gold/10 disabled:hover:text-gold"
          )}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Priority selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground font-light">Prioriteetti:</span>
        <div className="flex gap-2">
          {priorities.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value)}
              className={cn(
                "px-3 py-1 text-sm rounded-full border transition-all duration-300",
                priority === p.value
                  ? "bg-gold/20 border-gold/50 text-gold"
                  : "bg-transparent border-border/50 text-muted-foreground hover:border-gold/30 hover:text-gold/70"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
};

export default AddTodoForm;
