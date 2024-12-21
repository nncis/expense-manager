import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteExpense } from '@/lib/actions';

export function UpdateExpense({ id }: { id: string }){
  return(
  <Link
    className="rounded-md border p-2 hover:bg-gray-100"
    href={`/home/expense/${id}/edit`}
  >
    <PencilIcon className="w-5"/>
  </Link>
  )
};

export function DeleteExpense({ id }: { id: string }){
  const deleteExpenseWithId = deleteExpense.bind(null, id)
  return(
    <form action={deleteExpenseWithId}>
      <button  type="submit">
        <TrashIcon className="w-4"></TrashIcon>
      </button>
    </form>
  )
};