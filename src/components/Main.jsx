import SearchBar from "./SearchBar";
import UserCard from "./UserCard";

const Main = () => {
  return (
    <main className="flex w-full flex-1 flex-col gap-4 min-[380px]:gap-5">
      <section className="grid gap-4 lg:grid-cols-[1fr_420px] lg:items-end">
        <div className="float-in">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1f6f5b] min-[380px]:text-xs min-[380px]:tracking-[0.24em] dark:text-[#8fb9a8]">
            Public GitHub dossier
          </p>
          <h2 className="mt-3 max-w-3xl text-[2rem] font-bold leading-[1.08] tracking-normal min-[380px]:text-4xl sm:text-5xl dark:text-[#f4f1ea]">
            A quieter way to read developer profiles.
          </h2>
          <p className="mt-3 max-w-2xl text-[13px] leading-6 text-[#756d62] min-[380px]:mt-4 min-[380px]:text-sm min-[380px]:leading-7 dark:text-[#a8a8a8]">
            Search a username and review profile quality, project signal,
            languages, links, and public repository work in one focused place.
          </p>
        </div>
        <SearchBar />
      </section>

      <UserCard />
    </main>
  );
};

export default Main;
