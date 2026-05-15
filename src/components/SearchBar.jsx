import { useContext, useState } from "react";
import searchIcon from "../assets/icon-search.svg";
import { DevFinderContext } from "./DevFinderProvider";

const SearchBar = () => {
  const { theme, searchUser, status, error, searchHistory, rateLimit } =
    useContext(DevFinderContext);
  const [username, setUsername] = useState("");
  const isLight = theme === "light";
  const isLoading = status === "loading";

  const bgColor = isLight ? "bg-[#fffaf1]" : "bg-[#191919]";
  const textColor = isLight ? "text-[#272018]" : "text-[#f4f1ea]";
  const borderColor = isLight ? "border-[#d8d0c2]" : "border-white/10";

  const handleSearch = (e) => {
    e.preventDefault();
    searchUser(username);
  };

  const handleHistoryClick = (login) => {
    setUsername(login);
    searchUser(login);
  };

  return (
    <section className="float-in flex flex-col gap-3 [animation-delay:120ms]">
      <form
        onSubmit={handleSearch}
        className={`focus-card rounded-[24px] border p-2 transition focus-within:border-[#1f6f5b] min-[380px]:rounded-3xl min-[380px]:p-3 ${bgColor} ${textColor} ${borderColor}`}
      >
        <div className="grid grid-cols-[auto_1fr] gap-2 min-[380px]:flex min-[380px]:items-center min-[380px]:gap-3">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border min-[380px]:h-11 min-[380px]:w-11 ${
              isLight ? "border-[#e5ddcf] bg-[#f4f1ea]" : "border-white/10 bg-[#111111]"
            }`}
          >
            <img className="h-5 w-5 min-[380px]:h-6 min-[380px]:w-6" src={searchIcon} alt="" />
          </div>
          <input
            type="text"
            id="search"
            className={`min-w-0 rounded-xl bg-transparent px-1 py-2.5 text-sm font-bold outline-none placeholder:font-normal placeholder:text-xs min-[380px]:flex-1 min-[380px]:py-3 sm:text-base ${
              isLight
                ? "placeholder:text-[#8a8176]"
                : "placeholder:text-[#7f7f7f]"
            }`}
            placeholder="Search username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="col-span-2 min-h-10 rounded-2xl bg-[#1f6f5b] px-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#185947] focus:outline-none focus:ring-2 focus:ring-[#1f6f5b] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 min-[380px]:col-span-1 min-[380px]:min-h-11 sm:px-5"
          >
            {isLoading ? "Checking" : "Review"}
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-h-9 flex-wrap items-center gap-1.5 min-[380px]:gap-2">
          {searchHistory.map((login) => (
            <button
              key={login}
              type="button"
              onClick={() => handleHistoryClick(login)}
              className={`max-w-full truncate rounded-full border px-2.5 py-1.5 text-[11px] font-bold transition hover:-translate-y-0.5 hover:border-[#1f6f5b] hover:text-[#1f6f5b] min-[380px]:px-3 min-[380px]:text-xs ${
                isLight
                  ? "border-[#d8d0c2] bg-[#fffaf1] text-[#756d62]"
                  : "border-white/10 bg-[#191919] text-[#bdbdbd]"
              }`}
            >
              @{login}
            </button>
          ))}
        </div>
        <p
          className={`w-fit max-w-full rounded-full border px-2.5 py-1.5 text-[11px] font-bold min-[380px]:px-3 min-[380px]:text-xs ${
            error ? "text-[#ef4444]" : isLight ? "text-slate" : "text-[#9fb0cd]"
          } ${isLight ? "border-[#d8d0c2] bg-[#fffaf1]" : "border-white/10 bg-[#191919]"}`}
        >
          {error || `API requests left: ${rateLimit ?? "checking"}`}
        </p>
      </div>
    </section>
  );
};

export default SearchBar;
