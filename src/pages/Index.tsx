import { useState, useEffect } from "react";
import TodoItem from "@/components/TodoItem";
import AddTodoForm from "@/components/AddTodoForm";
import TodoStats from "@/components/TodoStats";
import { Sparkles } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

const STORAGE_KEY = "elegance-todos";

const getInitialTodos = (): Todo[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Virhe ladattaessa tehtäviä:", e);
  }
  // Oletusarvot jos ei tallennettuja
  return [
    { id: "1", text: "Suunnittele projektin rakenne", completed: true, priority: "high", createdAt: new Date().toISOString() },
    { id: "2", text: "Luo käyttöliittymän komponentit", completed: false, priority: "high", createdAt: new Date().toISOString() },
    { id: "3", text: "Testaa toiminnallisuudet", completed: false, priority: "medium", createdAt: new Date().toISOString() },
  ];
};

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>(getInitialTodos);

  // Tallenna localStorage:een aina kun todos muuttuu
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error("Virhe tallennettaessa tehtäviä:", e);
    }
  }, [todos]);

  const addTodo = (text: string, priority: "low" | "medium" | "high") => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.filter((t) => !t.completed).length;

  // Sort: incomplete first, then by priority
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 text-gold/80 text-sm uppercase tracking-[0.3em] mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Tehtävälista</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-semibold text-gradient-gold mb-3">
            Elegance
          </h1>
          <p className="text-muted-foreground font-light tracking-wide">
            Hallitse tehtäväsi tyylillä
          </p>
        </header>

        {/* Stats */}
        <section className="mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <TodoStats total={todos.length} completed={completedCount} pending={pendingCount} />
        </section>

        {/* Add form */}
        <section className="mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <AddTodoForm onAdd={addTodo} />
        </section>

        {/* Todo list */}
        <section className="space-y-3">
          {sortedTodos.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <p className="text-muted-foreground font-light text-lg">
                Ei tehtäviä vielä
              </p>
              <p className="text-muted-foreground/50 text-sm mt-2">
                Lisää ensimmäinen tehtäväsi yllä olevalla lomakkeella
              </p>
            </div>
          ) : (
            sortedTodos.map((todo, index) => (
              <div key={todo.id} style={{ animationDelay: `${0.3 + index * 0.05}s` }}>
                <TodoItem
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  priority={todo.priority}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              </div>
            ))
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-muted-foreground/40 text-sm font-light tracking-wide">
            Suunniteltu ❤️ tyylikkääseen tuottavuuteen
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
