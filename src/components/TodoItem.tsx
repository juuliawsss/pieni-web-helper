import { useState } from "react";
import { Check, Trash2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ id, text, completed, priority, onToggle, onDelete }: TodoItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const priorityStyles = {
    low: "border-l-muted-foreground/30",
    medium: "border-l-gold-dim",
    high: "border-l-gold",
  };

  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-lg border-l-4 transition-all duration-300",
        "bg-card/50 hover:bg-card border border-border/50 hover:border-border",
        "hover:glow-gold animate-fade-in",
        priorityStyles[priority],
        completed && "opacity-60"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(id)}
        className={cn(
          "relative w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
          completed
            ? "bg-gold border-gold"
            : "border-muted-foreground/40 hover:border-gold/60"
        )}
      >
        {completed && (
          <Check className="w-4 h-4 text-primary-foreground animate-check-bounce" />
        )}
      </button>

      {/* Text */}
      <span
        className={cn(
          "flex-1 text-foreground/90 font-light tracking-wide transition-all duration-300",
          completed && "line-through text-muted-foreground"
        )}
      >
        {text}
      </span>

      {/* Priority indicator */}
      {priority === "high" && !completed && (
        <Star className="w-4 h-4 text-gold fill-gold/30" />
      )}

      {/* Delete button */}
      <button
        onClick={() => onDelete(id)}
        className={cn(
          "p-2 rounded-lg transition-all duration-300",
          "text-muted-foreground hover:text-destructive hover:bg-destructive/10",
          "opacity-0 group-hover:opacity-100"
        )}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TodoItem;
