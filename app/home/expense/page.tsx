import Table from '@/ui/expense/table';
import style from '@/ui/expense.module.css';
import Search from '@/ui/expense/search';
import Pagination from '@/ui/expense/pagination';
import { fetchExpensePages } from '@/lib/data'

//
export default async function Expense(props:{
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}){

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchExpensePages(query);
  

  return (
    <div className={style.expensePage}>
      <Search />
      <Table query={query} currentPage={currentPage}/>
      <Pagination totalPages={totalPages || 1}/>
    </div>
  )
}