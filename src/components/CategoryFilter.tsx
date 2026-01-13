import { cn } from "@/lib/utils";
import { CATEGORIES, Category, Todo } from "@/pages/Index";
import { Filter } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: Category | "all";
  onSelectCategory: (category: Category | "all") => void;
  todos: Todo[];
}

const CategoryFilter = ({ selectedCategory, onSelectCategory, todos }: CategoryFilterProps) => {
  const getCategoryCount = (category: Category | "all") => {
    if (category === "all") return todos.length;
    return todos.filter((t) => t.category === category).length;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2 text-muted-foreground mr-2">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-light">Suodata:</span>
      </div>
      
      <button
        onClick={() => onSelectCategory("all")}
        className={cn(
          "px-3 py-1.5 text-sm rounded-full border transition-all duration-300",
          selectedCategory === "all"
            ? "bg-gold/20 border-gold/50 text-gold"
            : "bg-transparent border-border/50 text-muted-foreground hover:border-gold/30 hover:text-gold/70"
        )}
      >
        Kaikki ({getCategoryCount("all")})
      </button>

      {CATEGORIES.map((cat) => {
        const count = getCategoryCount(cat.value);
        return (
          <button
            key={cat.value}
            onClick={() => onSelectCategory(cat.value)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-full border transition-all duration-300",
              selectedCategory === cat.value
                ? cat.color
                : "bg-transparent border-border/50 text-muted-foreground hover:border-gold/30 hover:text-gold/70"
            )}
          >
            {cat.label} ({count})
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
