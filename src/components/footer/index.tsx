interface Item {
  id: string;
  name: string;
  checked: boolean;
  amount: number;
}

const Footer = ({ items }: { items: Item[] }) => {
  return (
    <footer className="text-center font-bold text-xl">
      {items.length !== 0 ? (
        <span>
          Total:{" "}
          {items.reduce((res, item) => (item.checked ? res + 1 : res), 0)}/
          {items.length}
        </span>
      ) : null}
    </footer>
  );
};

export default Footer;
