/** Weekly targets Ms. Mangan set, as Clever Goals reports them. */
export interface Goal {
  id: string;
  app: string;
  icon: string;
  /** What the target is measured in. */
  unit: "minutes" | "skills" | "lessons" | "books";
  target: number;
  completed: number;
}

export const goals: Goal[] = [
  { id: "ixl", app: "IXL", icon: "/app-icons/ixl.svg", unit: "skills", target: 30, completed: 31 },
  { id: "lexia", app: "Lexia Core5", icon: "/app-icons/lexia-core5.svg", unit: "minutes", target: 100, completed: 82 },
  { id: "zearn", app: "Zearn Math", icon: "/app-icons/zearn.svg", unit: "lessons", target: 4, completed: 3 },
  { id: "raz", app: "Raz-Kids", icon: "/app-icons/raz-kids.svg", unit: "books", target: 5, completed: 5 },
  { id: "xtramath", app: "XtraMath", icon: "/app-icons/xtramath.svg", unit: "minutes", target: 50, completed: 40 },
  { id: "iready", app: "i-Ready", icon: "/app-icons/i-ready.svg", unit: "minutes", target: 45, completed: 12 },
];
