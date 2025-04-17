import React, { useEffect } from "react";

const DevFinderContext = React.createContext();

const DevFinderProvider = ({ children }) => {
  const [theme, setTheme] = React.useState("light");
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/octocat")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <DevFinderContext.Provider value={{ theme, setTheme, user, setUser }}>
      {children}
    </DevFinderContext.Provider>
  );
};

export default DevFinderProvider;
export { DevFinderContext };
