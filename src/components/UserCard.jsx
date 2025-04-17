import { useContext } from "react";
import locationImage from "../assets/icon-location-white.svg";
import locationDarkImage from "../assets/icon-location.svg";
import websiteIcon from "../assets/icon-website-white.svg";
import websiteDarkIcon from "../assets/icon-website.svg";
import twitterIcon from "../assets/icon-twitter.svg";
import companyIcon from "../assets/icon-company-white.svg";
import companyDarkIcon from "../assets/icon-company.svg";
import { DevFinderContext } from "./DevFinderProvider";

const UserCard = () => {
  const { theme, user } = useContext(DevFinderContext);

  const bgColor = theme === "light" ? "bg-white" : "bg-navy";
  const textColor = theme === "light" ? "text-dark-navy" : "text-almost-white";
  const statsBgColor =
    theme === "light" ? "bg-very-light-gray" : "bg-dark-navy";
  const statsTextColor =
    theme === "light" ? "text-dark-navy" : "text-almost-white";

  if (!user) {
    return (
      <div
        className={`rounded-lg px-4 py-6 flex items-center justify-center shadow-xl ${bgColor} ${textColor}`}
      >
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg px-4 py-6 flex flex-col gap-4 xl:grid xl:grid-cols-4 shadow-xl ${bgColor} ${textColor}`}
    >
      {/* ----------------- */}
      <div className="flex items-center gap-4 mb-2 xl:col-span-4 xl:grid xl:grid-cols-4 relative">
        <img
          src={user.avatar_url}
          alt="User Avatar"
          className="w-16 h-16 rounded-full xl:absolute xl:top-0 xl:left-0 xl:w-30 xl:h-30 xl:rounded-full xl:col-start-1 xl:row-start-1"
        />
        <div className="flex flex-col xl:col-start-2 xl:col-span-3 xl:self-start xl:grid xl:grid-cols-2 xl:h-full">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-sm text-blue xl:col-start-1">@{user.login}</p>
          <p className="text-sm xl:col-start-2 xl:row-start-1 xl:pt-1 xl:ml-auto">
            Joined {user.created_at.slice(0, 10)}
          </p>
        </div>
      </div>
      {/* ------------- */}
      <p className="mb-4 xl:col-start-2 xl:col-span-3">
        {user.bio ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque necefficitur ligula."}
      </p>
      {/* --------------- */}
      <div
        className={`flex items-center justify-between gap-4 rounded-lg p-4 xl:col-start-2 xl:col-span-3  ${statsBgColor} ${statsTextColor}`}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs">Repos</p>
          <span className="text-md font-bold">{user.public_repos}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs">Followers</p>
          <span className="text-md font-bold">{user.followers}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs">Following</p>
          <span className="text-md font-bold">{user.following}</span>
        </div>
      </div>
      {/* location, links and socials */}
      <div className="flex flex-col gap-4 my-4 lg:grid lg:grid-cols-2 xl:col-start-2 xl:col-span-3">
        <div className="flex items-center gap-4">
          <img
            src={theme === "light" ? locationDarkImage : locationImage}
            alt=""
          />
          <span className="text-xs">{user.location}</span>
        </div>
        <div className="flex items-center gap-4">
          <img src={theme === "light" ? websiteDarkIcon : websiteIcon} alt="" />
          <span className="text-xs hover:underline cursor-pointer">
            {user.blog
              ? user.blog.replace("https://", "").replace("http://", "")
              : "Not available"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <img src={twitterIcon} alt="" />
          <span className="text-xs text-grayish-blue">
            {user.twitter_username || "Not available"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <img src={theme === "light" ? companyDarkIcon : companyIcon} alt="" />
          <span className="text-xs">{user.company || "Not available"}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
