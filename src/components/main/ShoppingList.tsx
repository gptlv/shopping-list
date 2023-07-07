import ListItem from "./ListItem";
// import { motion } from "framer-motion";
import { SortOption } from "../../shared/types";
// const container = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.15 },
//   },
// };

interface Item {
  id: string;
  name: string;
  checked: boolean;
  amount: number;
}

interface Props {
  items: Item[];
  deleteItem: (id: string) => void;
  toggleItem: (id: string, checked: boolean) => void;
  increaseAmount: (id: string) => void;
  decreaseAmount: (id: string) => void;
  setIsAllChecked: (checked: boolean) => void;
  sortOption: SortOption;
  sortItems: (sortOption: SortOption) => void;
}

const ShoppingList = ({
  items,
  deleteItem,
  toggleItem,
  increaseAmount,
  decreaseAmount,
  setIsAllChecked,
  sortOption,
  sortItems,
}: Props) => {
  return (
    <ul
      className="list-none mx-1 my-2 flex flex-col self-stretch justify-between"
      // initial="hidden"
      // whileInView="visible"
      // viewport={{ once: true, amount: 0.5 }}
      // variants={container}
    >
      {items.length === 0 && <p>No items in list</p>}
      {items.map((item) => {
        return (
          <ListItem
            {...item}
            key={item.id}
            deleteItem={deleteItem}
            toggleItem={toggleItem}
            increaseAmount={increaseAmount}
            decreaseAmount={decreaseAmount}
            setIsAllChecked={setIsAllChecked}
            items={items}
            sortOption={sortOption}
            sortItems={sortItems}
          />
        );
      })}
    </ul>
  );
};

export default ShoppingList;
