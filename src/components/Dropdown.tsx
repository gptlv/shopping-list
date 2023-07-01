interface Props {
  handleSortOptionChange: (sortOption: string) => void;
  sortOption: string;
}
const Dropdown = ({ handleSortOptionChange, sortOption }: Props) => {
  return (
    <div className="">
      <label>
        <span>Sort by: </span>
        <select
          value={sortOption}
          // className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
          onChange={(e) => handleSortOptionChange(e.target.value)}
        >
          <option value="time">Time added (newest)</option>
          <option value="alphabetical">A-Z</option>
          <option value="amount">Amount</option>
        </select>
      </label>
    </div>
  );
};

export default Dropdown;
