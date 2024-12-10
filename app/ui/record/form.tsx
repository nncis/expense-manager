import Link from "next/link";

export default function Form() {

  const categories: string[] = ["Verduleria", "Carniceria", "Almacen"];

  return (
    <form>
      <div>
        <label>
          Record a expense
        </label>
        {/* choose category */}
        <div>
          <select>
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        {/* input name product */}
        <div>
          <label>
            Product
          </label>
          <div>
            <input
              id="product-name"
              name="product-name"
              type="text"
              placeholder="Enter name product"
            ></input>
          </div>
        </div>
        {/* input amount */}
        <div>
          <label htmlFor="">
            Amount
          </label>
          <div>
            <input
              id="amount"
              name="amount" 
              type="number"
              placeholder="Enter amount"
              step="0.01"
              />
          </div>
        </div>

        <button>Submit</button>
        <Link 
          href="/home/record"
        >
          Cancel
        </Link>
      </div>

    </form>
  )
}