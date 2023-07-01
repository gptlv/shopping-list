interface Item {
  id: string;
  name: string;
  amount: number;
  checked: boolean;
  date: number;
}
interface Props {
  amountOfItems: number;
  isAllChecked: boolean;
  setIsAllChecked: (checked: boolean) => void;
  toggleAllItems: (checked: boolean) => void;
  deleteAllItems: () => void;
  handleShare: () => void;
  handleSortOptionChange: (sortOption: string) => void;
  sortOption: string;
  items: Item[];
}

const GlobalButtons = ({
  amountOfItems,
  isAllChecked,
  setIsAllChecked,
  toggleAllItems,
  deleteAllItems,
  handleShare,
  handleSortOptionChange,
  sortOption,
  items,
}: Props) => {
  return (
    <>
      {items.length > 0 ? (
        <div className="flex self-stretch justify-between gap-4 select-none">
          <div className="w-full lg:w-1/3 ">
            <label htmlFor="sort">
              {/* <span>Sort by: </span> */}
              <select
                id="sort"
                value={sortOption}
                className="w-full text-black text-2xl rounded-lg p-1 border border-solid border-blue-700"
                onChange={(e) => handleSortOptionChange(e.target.value)}
              >
                <option value="time">Time added (newest)</option>
                <option value="alphabetical">A-Z</option>
                <option value="amount">Amount</option>
              </select>
            </label>
          </div>
          <div className="flex items-center gap-2" draggable="false">
            <label htmlFor="done" className="cursor-pointer flex items-center">
              <input
                id="done"
                className="align-middle w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                checked={isAllChecked}
                disabled={amountOfItems === 0}
                onChange={(e) => {
                  toggleAllItems(e.target.checked);
                  setIsAllChecked(e.target.checked);
                }}
              />
              <span className="align-middle ml-2">Done</span>
            </label>
            <button className="button delete" onClick={() => deleteAllItems()}>
              🗑️
            </button>
            <button className="button copy" onClick={handleShare}>
              📋
            </button>
          </div>
        </div>
      ) : undefined}
    </>
  );
};

export default GlobalButtons;
