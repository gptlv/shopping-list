import { PlusIcon, MinusIcon, XMarkIcon } from "@heroicons/react/20/solid";
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
        <span className="ml-2">
          <span className="item-name whitespace-normal">{name}</span>
          <span className="item-amount"> ({amount})</span>
        </span>
      </label>
      <div className="flex flex-nowrap">
        <button
          className="button increase"
          onClick={() => {
            increaseAmount(id);
            sortItems(sortOption);
          }}
          disabled={checked}
        >
          <PlusIcon className="w-8 h-8 md:h-10 md:w-10" />
        </button>
        <button
          className="button decrease"
          onClick={() => {
            decreaseAmount(id);
            sortItems(sortOption);
          }}
          disabled={checked}
        >
          <MinusIcon className="w-8 h-8 md:h-10 md:w-10" />
        </button>
        <button
          className="button delete"
          onClick={() => {
            deleteItem(id);
            sortItems(sortOption);
          }}
        >
          <XMarkIcon className="w-8 h-8 md:h-10 md:w-10" />
        </button>
      </div>
    </li>
  );
};

export default ListItem;
