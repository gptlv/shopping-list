import ShoppingList from "./ShoppingList";
import InputForm from "./InputForm";
import GlobalButtons from "./GlobalButtons";
import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
import { SortOption } from "../../shared/types";
interface Item {
  id: string;
  name: string;
  checked: boolean;
  amount: number;
  date: number;
}
type Props = { items: Item[]; setItems: React.Dispatch<any> };

const Main = ({ items, setItems }: Props) => {
  const [isAllChecked, setIsAllChecked] = useState(() => {
    const localValue = localStorage.getItem("IS_ALL_CHECKED");
    if (localValue == null) return false;
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("IS_ALL_CHECKED", JSON.stringify(isAllChecked));
  }, [isAllChecked]);

  function addItem(name: string) {
    setItems((currentItems: Item[]) => {
      if (isAllChecked) {
        setIsAllChecked(false);
      }
      return [
        ...currentItems,
        {
          id: crypto.randomUUID(),
          name,
          checked: false,
          amount: 1,
          date: Date.now(),
        },
      ];
    });
  }

  function toggleItem(id: string, checked: boolean) {
    setItems((currentItems: Item[]) => {
      const updatedItems = currentItems.map((item) => {
        if (item.id === id) return { ...item, checked };
        return item;
      });
      updateIsAllChecked(updatedItems);
      setIsAllChecked(updatedItems.every((item: Item) => item.checked));
      return updatedItems;
    });
  }

  function toggleAllItems(checked: boolean) {
    setIsAllChecked(true);
    setItems((currentItems: Item[]) => {
      return currentItems.map((item) => {
        return { ...item, checked };
      });
    });
  }

  function deleteItem(id: string) {
    return setItems((currentItems: Item[]) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  function deleteAllItems() {
    setItems([]);
    setIsAllChecked(false);
    localStorage.setItem("IS_ALL_CHECKED", JSON.stringify(false));
  }

  function increaseAmount(id: string) {
    setItems((currentItems: Item[]) => {
      return currentItems.map((item) => {
        if (item.id === id) return { ...item, amount:  item.amount < 99 ? item.amount + 1 : item.amount };
        return item;
      });
    });
  }

  function handleAmountChange(id: string, amount: number) {
    setItems((currentItems: Item[]) => {
      return currentItems.map((item) => {
        if (item.id === id) return { ...item, amount};
        return item;
      });
    });
  }

  function decreaseAmount(id: string) {
    setItems((currentItems: Item[]) => {
      return currentItems.map((item) => {
        if (item.id === id && item.amount > 0)
          return { ...item, amount: item.amount > 0 ? item.amount - 1 : item.amount, checked: item.amount === 1 ? true : false  };
        return item;
      });
    });
  }

  function updateIsAllChecked(items: Item[]) {
    if (items.every((item: Item) => item.checked)) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }

  function handleShare() {
    setItems((currentItems: Item[]) => {
      if (currentItems == null) return;

      const formattedItems = items.map((item: Item) => {
        const checkmark = item.checked ? "✓" : "✗";
        return `${checkmark} ${item.name} (${item.amount})\n`;
      });

      navigator.clipboard.writeText(formattedItems.join(""));
      // console.log(formattedItems);
      return currentItems;
    });
  }

  const [sortOption, setSortOption] = useState(SortOption.AlphabeticalFromAtoZ);

  function sortItems(sortOption: string) {
    setItems((currentItems: Item[]) => {
      if (currentItems == null) return;
      if (sortOption === SortOption.TimeAddedNewFirst) {
        const sortedArray = currentItems.sort((a, b) => b.date - a.date);
        return [...sortedArray];
      }
      if (sortOption === SortOption.TimeAddedNewLast) {
        const sortedArray = currentItems.sort((a, b) => a.date - b.date);
        return [...sortedArray];
      }
      if (sortOption === SortOption.AmountDescending) {
        const sortedArray = currentItems.sort((a, b) => a.amount - b.amount);
        return [...sortedArray];
      }
      if (sortOption === SortOption.AmountAscending) {
        const sortedArray = currentItems.sort((a, b) => b.amount - a.amount);
        return [...sortedArray];
      }
      if (sortOption === SortOption.AlphabeticalFromAtoZ) {
        const sortedArray = currentItems.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        return [...sortedArray];
      }
      if (sortOption === SortOption.AlphabeticalFromZtoA) {
        const sortedArray = currentItems.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        return [...sortedArray];
      }
      if (sortOption === SortOption.CompletedFirst) {
        const sortedArray = currentItems.sort(
          (a, b) => Number(b.checked) - Number(a.checked)
        );
        return [...sortedArray];
      }
      if (sortOption === SortOption.CompletedLast) {
        const sortedArray = currentItems.sort(
          (a, b) => Number(a.checked) - Number(b.checked)
        );
        return [...sortedArray];
      }
      return currentItems;
    });
  }

  return (
    <main className="max-w-4xl mx-auto">
      <section className="flex justify-center p-6 items-center gap-5 md:mb-5 mb-1 flex-col text-xl">
        <InputForm
          onSubmit={addItem}
          sortItems={sortItems}
          sortOption={sortOption}
        ></InputForm>
        <GlobalButtons
          amountOfItems={items.length}
          isAllChecked={isAllChecked}
          setIsAllChecked={setIsAllChecked}
          toggleAllItems={toggleAllItems}
          deleteAllItems={deleteAllItems}
          handleShare={handleShare}
          sortOption={sortOption}
          setSortOption={setSortOption}
          sortItems={sortItems}
          items={items}
        ></GlobalButtons>
        <ShoppingList
          items={items}
          handleAmountChange={handleAmountChange}
          deleteItem={deleteItem}
          toggleItem={toggleItem}
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
          setIsAllChecked={setIsAllChecked}
          sortOption={sortOption}
          sortItems={sortItems}
        ></ShoppingList>
      </section>
    </main>
  );
};

export default Main;
