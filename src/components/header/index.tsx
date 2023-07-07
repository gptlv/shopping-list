import { ShoppingBagIcon } from "@heroicons/react/24/solid";
type Props = {};

const Header = ({}: Props) => {
  return (
    <header className="bg-teal-700 text-white top-0 z-10">
      <section className="max-w-4xl mx-auto p-4 flex justify-center items-center flex-row">
        <ShoppingBagIcon className="w-8 h-8 mr-2 " />
        <h1 className="text-4xl font-medium">Shopping List</h1>
      </section>
    </header>
  );
};

export default Header;
