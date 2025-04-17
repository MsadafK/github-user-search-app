import { useContext, useState } from "react";
import searchIcon from "../assets/icon-search.svg";
import { DevFinderContext } from "./DevFinderProvider";

const SearchBar = () => {
  const { theme, setUser } = useContext(DevFinderContext);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const bgColor = theme === "light" ? "bg-white" : "bg-navy";
  const textColor = theme === "light" ? "text-dark-navy" : "text-almost-white";
  const placeholderText =
    theme === "light"
      ? "placeholder:text-dark-navy"
      : "placeholder:text-almost-white";

  const handleSearch = (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("No results");
        // setUser(null); // Reset user if not found
      });
  };

  return (
    <div
      className={`rounded-lg shadow-xl p-2 md:flex md:items-center md:justify-between  ${bgColor} ${textColor}`}
    >
      {/* ----- */}
      <img className="hidden md:block mr-2" src={searchIcon} alt="" />
      {/* ----- */}
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-between xs:w-full"
      >
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          id="search"
          className={`w-full p-2 rounded-lg placeholder:text-xs cursor-pointer ${placeholderText} ${bgColor} ${textColor}`}
          placeholder="Search GitHub username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        {error && (
          <p className="text-red-500 text-sm font-semibold mx-2">{error}</p>
        )}
        <button
          type="submit"
          className="bg-blue text-almost-white p-2 rounded-lg hover:opacity-[0.7] transition-colors duration-300 cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
