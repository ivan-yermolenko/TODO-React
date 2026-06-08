import type { Metadata } from "next";
import EditTaskClient from "./EditTaskClient";

type Props = {
  params: Promise<{ uuid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uuid } = await params;
  return {
    title: "Редагувати завдання",
    description: `Редагування завдання з ідентифікатором ${uuid}`,
  };
}

export default async function EditTaskPage({ params }: Props) {
  const { uuid } = await params;
  return <EditTaskClient uuid={uuid} />;
}
