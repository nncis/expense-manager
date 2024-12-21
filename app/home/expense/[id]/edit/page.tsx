import { fetchExpenseById } from "@/lib/data";
import EditForm from '@/ui/expense/edit-form';

export default async function Page(props: { params: Promise<{ id: string }>}) {
  const params = await props.params;
  const id = params.id;
  const expense = await fetchExpenseById(id);

  console.log(expense)
  // const date = new Date(expense.date);
  // const formatDate = date.toISOString().split("T")[0];

  return (
    <main>
      <EditForm expense={expense} id={id} >

      </EditForm>
    </main>
  );
};