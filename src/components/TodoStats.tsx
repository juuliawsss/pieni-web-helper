import { CheckCircle2, Circle, ListTodo } from "lucide-react";

interface TodoStatsProps {
  total: number;
  completed: number;
  pending: number;
}

const TodoStats = ({ total, completed, pending }: TodoStatsProps) => {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { icon: ListTodo, label: "Yhteensä", value: total, color: "text-foreground" },
    { icon: CheckCircle2, label: "Valmiit", value: completed, color: "text-success" },
    { icon: Circle, label: "Kesken", value: pending, color: "text-gold" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/30 border border-border/30"
          >
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <span className="text-2xl font-display font-semibold text-foreground">{stat.value}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground font-light">Edistyminen</span>
          <span className="text-sm text-gold font-medium">{completionRate}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-dim to-gold transition-all duration-500 ease-out rounded-full"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoStats;
