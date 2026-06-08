import type { Metadata } from "next";
import TaskForm from "@/components/TaskForm/TaskForm";

export const metadata: Metadata = {
  title: "Нове завдання",
  description: "Створення нового завдання у вашому списку справ",
};

export default function NewTaskPage() {
  return <TaskForm />;
}
