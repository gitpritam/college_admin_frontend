import { RxHamburgerMenu } from "react-icons/rx";

const Topbar = ({
  isOpen,
  handleOpen,
}: {
  isOpen: boolean;
  handleOpen: () => void;
}) => {
  return (
    <div className="min-h-[60px] bg-white flex border-b-1 px-5 border-gray-200 w-full items-center gap-5 ">
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="cursor-pointer bg-white hover:bg-gray-100 transition p-2 rounded-full"
        >
          <RxHamburgerMenu size={20} />
        </button>
      )}
      <h1>Dashboard</h1>
      <div>{/* avatar, notification */}</div>
    </div>
  );
};

export default Topbar;
