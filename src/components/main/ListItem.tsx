import { PlusIcon, MinusIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import { motion } from "framer-motion";
import { SortOption } from "../../shared/types";

// const childVariant = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: { opacity: 1, scale: 1 },
// };

interface Item {
  id: string;
  name: string;
  checked: boolean;
  amount: number;
}

interface Props {
  amount: number;
  checked: boolean;
  id: string;
  name: string;
  deleteItem: (id: string) => void;
  toggleItem: (id: string, checked: boolean) => void;
  increaseAmount: (id: string) => void;
  handleAmountChange: (id: string, amount: number) => void;
  decreaseAmount: (id: string) => void;
  setIsAllChecked: (checked: boolean) => void;
  items: Item[];
  sortOption: SortOption;
  sortItems: (sortOption: SortOption) => void;
}

const ListItem = ({
  amount,
  checked,
  id,
  name,
  deleteItem,
  toggleItem,
  increaseAmount,
  handleAmountChange,
  decreaseAmount,
  sortOption,
  sortItems,
}: Props) => {
  return (
    <li
      // variants={childVariant}
      // key={id}
      className="flex flex-row justify-between mb-5 text-2xl  items-center border border-solid border-slate-900  bg-emerald-100 py-6 px-2 rounded-xl shadow-xl"
    >
      <label className="flex items-center whitespace-normal break-words md:break-all">
        <input
          className="ml-2 w-6 h-6 md:w-8 md:h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            toggleItem(id, e.target.checked);
            sortItems(sortOption);
          }}
        />
        <p className="ml-2">
          <span className="item-name whitespace-normal">{name}</span>
        </p>
      </label>
      <div className="flex flex-nowrap gap-1">
        <div className="flex flex-nowrap items-center justify-center">
          <button
            className={`w-8 h-8 md:h-10 md:w-10 bg-white rounded-l-lg ${
              checked || amount === 0 ? "text-gray-400" : ""
            }`}
            onClick={() => {
              if (amount === 1) toggleItem(id, true);
              decreaseAmount(id);
              sortItems(sortOption);
            }}
            disabled={checked || amount === 0}
          >
            <MinusIcon className="w-8 h-8 md:h-10 md:w-10" />
          </button>
          <input
            type="number"
            className={`w-8 h-8 md:h-10 md:w-10 text-center border-l-2 border-r-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              checked ? "text-gray-400" : ""
            }`}
            min="1"
            max="99"
            readOnly={checked}
            onChange={(e) => {
              const currentValue = parseInt(e.target.value, 10);
              if (Number.isNaN(currentValue)) {
                handleAmountChange(id, 0);
                return;
              }
              if (currentValue < 1 || currentValue > 99) return;
              handleAmountChange(id, currentValue);
            }}
            value={amount}
          ></input>
          <button
            className={`w-8 h-8 md:h-10 md:w-10 bg-white rounded-r-lg ${
              checked ? "text-gray-400" : ""
            }`}
            onClick={() => {
              increaseAmount(id);
              sortItems(sortOption);
            }}
            disabled={checked}
          >
            <PlusIcon />
          </button>
        </div>
        <div className="flex items-center justify-center ">
          <button
            className="w-8 h-8 md:h-10 md:w-10 bg-red-500 rounded-lg"
            onClick={() => {
              deleteItem(id);
              sortItems(sortOption);
            }}
          >
            <XMarkIcon className="" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
