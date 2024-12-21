import { fetchExpenseById } from "@/lib/data";
import EditForm from '@/ui/expense/edit-form';

export default async function Page(props: { params: Promise<{ id: string }>}) {
  const params = await props.params;
  const id = params.id;
  const expense = await fetchExpenseById(id);

  return (
    <main>
      <EditForm expense={expense} id={id} >

      </EditForm>
    </main>
  );
};