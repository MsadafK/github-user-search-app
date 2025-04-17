// import { useContext } from "react";
import SearchBar from "./SearchBar";
import UserCard from "./UserCard";

const Main = () => {
  return (
    <main className="w-full p-4 flex flex-col gap-4">
      <SearchBar />
      <UserCard />
    </main>
  );
};

export default Main;
