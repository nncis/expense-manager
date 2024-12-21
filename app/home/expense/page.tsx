import Table from '@/ui/expense/table'
import style from '@/ui/expense.module.css'


export default async function Expense(props: {
  searchParams?: Promise<{
    user?: string, 
    query?: string, 
    page?: string
  }>
}){

  const searchParams = await props.searchParams;
  const user = searchParams?.user || '';
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await fetchInvoicesPages(query);

  return (
    <div className={style.expensePage}>
      {/* <p>{user}</p>
      <p>{query}</p>
      <p>{currentPage}</p> */}
      <Table user={user} query={query} currentPage={currentPage} />
    </div>
  )
}