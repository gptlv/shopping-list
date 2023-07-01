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
  handleSortOptionChange: (sortOption: string) => void;
  sortOption: string;
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
  handleSortOptionChange,
  sortOption,
}: Props) => {
  return (
    <li
      key={id}
      className="flex flex-row justify-between basis-full mb-5 items-center border border-solid border-slate-900 dark:border-gray-100 bg-white dark:bg-black py-6 px-2 rounded-xl shadow-xl"
    >
      <label className="flex items-center">
        <input
          className="ml-2 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            toggleItem(id, e.target.checked);
          }}
        />
        <span className="ml-2">
          <span className="item-name">{name}</span>
          <span className="item-amount"> ({amount})</span>
        </span>
      </label>
      <div className="flex flex-nowrap">
        <button
          className="button increase"
          onClick={() => {
            increaseAmount(id);
            handleSortOptionChange(sortOption);
          }}
          disabled={checked}
        >
          ➕
        </button>
        <button
          className="button decrease"
          onClick={() => {
            decreaseAmount(id);
            handleSortOptionChange(sortOption);
          }}
          disabled={checked}
        >
          ➖
        </button>
        <button
          className="button delete"
          onClick={() => {
            deleteItem(id);
            handleSortOptionChange(sortOption);
          }}
        >
          ❌
        </button>
      </div>
    </li>
  );
};

export default ListItem;
