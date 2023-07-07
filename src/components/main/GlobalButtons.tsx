import { TrashIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { SortOption } from "../../shared/types";
import { Tooltip } from "react-tooltip";
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
  setSortOption: (sortOption: SortOption) => void;
  sortOption: string;
  sortItems: (sortOption: string) => void;
  items: Item[];
}

const sortingOptions = [
  {
    value: SortOption.AlphabeticalFromAtoZ,
    text: "A-Z",
  },
  {
    value: SortOption.AlphabeticalFromZtoA,
    text: "Z-A",
  },
  {
    value: SortOption.TimeAddedNewFirst,
    text: "Time Added (Newest First)",
  },
  {
    value: SortOption.TimeAddedNewLast,
    text: "Time Added (Oldest First)",
  },
  {
    value: SortOption.AmountAscending,
    text: "Amount (Largest First)",
  },
  {
    value: SortOption.AmountDescending,
    text: "Amount (Smallest First)",
  },
  { value: SortOption.CompletedFirst, text: "Completed First" },
  { value: SortOption.CompletedLast, text: "Uncompleted First" },
];

const GlobalButtons = ({
  amountOfItems,
  isAllChecked,
  setIsAllChecked,
  toggleAllItems,
  deleteAllItems,
  handleShare,
  sortOption,
  setSortOption,
  sortItems,
  items,
}: Props) => {
  return (
    <>
      {items.length > 0 ? (
        <div className="flex self-stretch justify-between gap-4 select-none text-2xl ">
          <div className="w-full">
            <label htmlFor="sort">
              {/* <span>Sort by: </span> */}
              <select
                id="sort"
                value={sortOption}
                className="w-full text-black rounded-lg p-1 border border-solid border-blue-700"
                onChange={(e) => {
                  setSortOption(e.target.value as SortOption);
                  sortItems(e.target.value);
                }}
              >
                {sortingOptions.map((option) => (
                  <option value={option.value}>{option.text}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex items-center gap-2" draggable="false">
            <label
              htmlFor="done"
              className="cursor-pointer flex items-center"
              data-tooltip-id="mark-all-done"
              data-tooltip-content="Mark All Done"
            >
              <input
                id="done"
                className="align-middle w-6 h-6 md:w-8 md:h-8 text-blue-600 bg-gray-100 cursor-pointer border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                checked={isAllChecked}
                disabled={amountOfItems === 0}
                onChange={(e) => {
                  toggleAllItems(e.target.checked);
                  setIsAllChecked(e.target.checked);
                }}
              />
              <span className="align-middle ml-2 relative">Done</span>
            </label>
            <Tooltip id="mark-all-done" />
            <button
              onClick={() => deleteAllItems()}
              data-tip="Delete All Items"
            >
              <TrashIcon
                className="w-8 h-8 md:h-10 md:w-10 relative"
                data-tooltip-id="delete-all-items"
                data-tooltip-content="Delete All Items"
              ></TrashIcon>
              <Tooltip id="delete-all-items" />
            </button>
            <button onClick={handleShare}>
              <ClipboardDocumentIcon
                className="w-8 h-8 md:h-10 md:w-10"
                data-tooltip-id="copy-to-clipboard"
                data-tooltip-content="Copy to Clipboard"
              ></ClipboardDocumentIcon>
              <Tooltip id="copy-to-clipboard" />
            </button>
          </div>
        </div>
      ) : undefined}
    </>
  );
};

export default GlobalButtons;
