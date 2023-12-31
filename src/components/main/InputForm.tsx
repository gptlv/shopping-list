import { useState } from "react";
// import { motion } from "framer-motion";

interface Props {
  onSubmit: (itemName: string) => void;
  sortItems: (sortOption: string) => void;
  sortOption: string;
}

const InputForm = ({ onSubmit, sortItems, sortOption }: Props) => {
  const [itemName, setItemName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (itemName === "") return;
    onSubmit(itemName);
    setItemName("");
    sortItems(sortOption);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex self-stretch justify-between gap-4 text-2xl "
    >
      <div className="form-row w-full">
        {/* <label htmlFor="item" className="form-label">
          Item name:
        </label> */}
        <input
          className="w-full text-black text-2xl rounded-lg p-1 border border-solid border-blue-700"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          type="text"
          id="item"
          required
          placeholder="Item name"
        />
      </div>
      <button className="bg-teal-700 hover:bg-teal-600 active:bg-teal-500 text-white py-1 px-3 rounded-xl border border-solid border-slate-900">
        Add
      </button>
    </form>
  );
};

export default InputForm;
