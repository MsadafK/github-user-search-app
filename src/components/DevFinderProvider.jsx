import React, { useCallback, useEffect, useMemo, useState } from "react";

const DevFinderContext = React.createContext();

const DEFAULT_USER = "octocat";
const HISTORY_LIMIT = 6;

const getStoredTheme = () => {
  const storedTheme = localStorage.getItem("devfinder-theme");

  if (storedTheme) return storedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getStoredHistory = () => {
  try {
    return JSON.parse(localStorage.getItem("devfinder-history")) || [];
  } catch {
    return [];
  }
};

const DevFinderProvider = ({ children }) => {
  const [theme, setTheme] = useState(getStoredTheme);
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState(getStoredHistory);
  const [rateLimit, setRateLimit] = useState(null);

  const searchUser = useCallback(async (username = DEFAULT_USER) => {
    const cleanUsername = username.trim().replace(/^@/, "");

    if (!cleanUsername) return;

    setStatus("loading");
    setError("");

    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${cleanUsername}`
      );

      setRateLimit(userResponse.headers.get("x-ratelimit-remaining"));

      if (userResponse.status === 404) {
        throw new Error("No GitHub profile found for that username.");
      }

      if (!userResponse.ok) {
        throw new Error("GitHub API is temporarily unavailable. Try again.");
      }

      const profile = await userResponse.json();
      const reposResponse = await fetch(
        `${profile.repos_url}?sort=updated&per_page=8`
      );

      const repoData = reposResponse.ok ? await reposResponse.json() : [];

      setUser(profile);
      setRepos(repoData);
      setSearchHistory((currentHistory) => {
        const nextHistory = [
          profile.login,
          ...currentHistory.filter(
            (item) => item.toLowerCase() !== profile.login.toLowerCase()
          ),
        ].slice(0, HISTORY_LIMIT);

        localStorage.setItem("devfinder-history", JSON.stringify(nextHistory));
        return nextHistory;
      });
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("devfinder-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    searchUser(DEFAULT_USER);
  }, [searchUser]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      user,
      repos,
      status,
      error,
      searchHistory,
      rateLimit,
      searchUser,
    }),
    [error, rateLimit, repos, searchHistory, searchUser, status, theme, user]
  );

  return (
    <DevFinderContext.Provider value={value}>
      {children}
    </DevFinderContext.Provider>
  );
};

export default DevFinderProvider;
export { DevFinderContext };
