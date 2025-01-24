import { getWeekExpenses } from "@/lib/data";
import { auth } from "../../../auth";

export default async function handler(req: { method: string; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { amount: number; category: string; date: Date; }[]): any; new(): any; }; }; }) {
  if (req.method !== 'GET') {
    console.log('Method Not Allowed')
    return
    // return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Verifica la autenticación antes de proceder
    const session = await auth();
    const user = session?.user;

    if (!user) {
      // return res.status(401).json({ error: 'Unauthorized' }); // No autenticado
      console.log('Unauthorized')
      return
    }

    // Llama a la función para obtener los gastos de la semana
    const expenses = await getWeekExpenses();

    return res.status(200).json(expenses); // Devuelve los datos si todo es correcto
  } catch (error) {
    console.error('Error fetching week expenses:', error);
    // return res.status(500).json({ error: 'Internal Server Error' });
  }
}