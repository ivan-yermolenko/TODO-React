import type { Metadata } from "next";
import TaskListClient from "./TaskListClient";

export const metadata: Metadata = {
  title: "Список завдань",
  description: "Ваш персональний список завдань та нагадувань",
};

export default function TaskList() {
    return <TaskListClient />;
}
