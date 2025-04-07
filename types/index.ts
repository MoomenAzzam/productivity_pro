export interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  tag: "work" | "study" | "personal";
  status: "todo" | "in-progress" | "done";
  isHidden: boolean;
}
