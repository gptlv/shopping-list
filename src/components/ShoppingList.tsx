import ListItem from "./ListItem";
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
  handleSortOptionChange: (sortOption: string) => void;
  sortOption: string;
}

const ShoppingList = ({
  items,
  deleteItem,
  toggleItem,
  increaseAmount,
  decreaseAmount,
  setIsAllChecked,
  handleSortOptionChange,
  sortOption,
}: Props) => {
  return (
    <ul className="list-none mx-1 my-2 flex flex-col self-stretch justify-between">
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
            handleSortOptionChange={handleSortOptionChange}
            sortOption={sortOption}
          />
        );
      })}
    </ul>
  );
};

export default ShoppingList;
