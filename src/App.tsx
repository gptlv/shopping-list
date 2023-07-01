import ShoppingList from "./components/ShoppingList";
import InputForm from "./components/InputForm";
import Footer from "./components/Footer";
import GlobalButtons from "./components/GlobalButtons";
// import Dropdown from "./components/Dropdown";
import { useEffect, useState } from "react";
import "./index.css";
interface Item {
  id: string;
  name: string;
  checked: boolean;
  amount: number;
  date: number;
}

export default function App() {
  const [items, setItems] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(items));
  });

  const [isAllChecked, setIsAllChecked] = useState(() => {
    const localValue = localStorage.getItem("IS_ALL_CHECKED");
    if (localValue == null) return false;
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("IS_ALL_CHECKED", JSON.stringify(isAllChecked));
  });

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
  }

  function increaseAmount(id: string) {
    setItems((currentItems: Item[]) => {
      return currentItems.map((item) => {
        if (item.id === id) return { ...item, amount: item.amount + 1 };
        return item;
      });
    });
  }

  function decreaseAmount(id: string) {
    setItems((currentItems: Item[]) => {
      return currentItems.map((item) => {
        if (item.id === id && item.amount > 0)
          return { ...item, amount: item.amount - 1 };
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

  const [sortOption, setSortOption] = useState("");

  function handleSortOptionChange(sortOption: string) {
    setSortOption(sortOption);
    sortItems(sortOption);
    // console.log(JSON.stringify(items));
  }

  function sortItems(sortOption: string) {
    setItems((currentItems: Item[]) => {
      if (currentItems == null) return;
      if (sortOption === "time") {
        const sortedArray = currentItems.sort((a, b) => b.date - a.date);
        return [...sortedArray];
      }
      if (sortOption === "amount") {
        const sortedArray = currentItems.sort((a, b) => b.amount - a.amount);
        return [...sortedArray];
      }
      if (sortOption === "alphabetical") {
        const sortedArray = currentItems.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        return [...sortedArray];
      }
      return currentItems;
    });
  }

  return (
    <div className="wrapper">
      <header className="bg-teal-700 text-white top-0 z-10">
        <section className="max-w-4xl mx-auto p-4 flex justify-between items-center flex-col">
          <h1 className="text-3xl font-medium">🛍️ Shopping List</h1>
        </section>
      </header>
      <main className="max-w-4xl mx-auto">
        <section className="flex justify-center p-6 items-center gap-5 mb-12 flex-col text-xl">
          <InputForm onSubmit={addItem}></InputForm>
          <GlobalButtons
            amountOfItems={items.length}
            isAllChecked={isAllChecked}
            setIsAllChecked={setIsAllChecked}
            toggleAllItems={toggleAllItems}
            deleteAllItems={deleteAllItems}
            handleShare={handleShare}
            handleSortOptionChange={handleSortOptionChange}
            sortOption={sortOption}
            items={items}
          ></GlobalButtons>
          {/* <Dropdown
            handleSortOptionChange={handleSortOptionChange}
            sortOption={sortOption}
          ></Dropdown> */}
          <ShoppingList
            items={items}
            deleteItem={deleteItem}
            toggleItem={toggleItem}
            increaseAmount={increaseAmount}
            decreaseAmount={decreaseAmount}
            setIsAllChecked={setIsAllChecked}
            handleSortOptionChange={handleSortOptionChange}
            sortOption={sortOption}
          ></ShoppingList>
          <Footer items={items} />
        </section>
      </main>
    </div>
  );
}
