import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export function UpdateExpense({ id }: {id: string}){
  return(
  <Link
    className="rounded-md border p-2 hover:bg-gray-100"
    href={`/home/expense/${id}/edit`}
  >
    <PencilIcon className="w-5"/>
  </Link>
  )
};

export function DeleteExpense(){
  return(
    <TrashIcon className="w-4"></TrashIcon>
  )
};