import { useContext } from "react";
import locationImage from "../assets/icon-location-white.svg";
import locationDarkImage from "../assets/icon-location.svg";
import websiteIcon from "../assets/icon-website-white.svg";
import websiteDarkIcon from "../assets/icon-website.svg";
import twitterIcon from "../assets/icon-twitter.svg";
import companyIcon from "../assets/icon-company-white.svg";
import companyDarkIcon from "../assets/icon-company.svg";
import { DevFinderContext } from "./DevFinderProvider";

const numberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const languageColors = {
  JavaScript: "#c9a227",
  TypeScript: "#2f6f9f",
  Python: "#33624a",
  HTML: "#b85c38",
  CSS: "#6a5d9f",
  Java: "#8a5a33",
  "C++": "#9f4265",
  C: "#686868",
  Go: "#348b98",
  Rust: "#9b6a45",
  PHP: "#555f8f",
  Ruby: "#94403a",
  Swift: "#b95b38",
  Kotlin: "#7655a6",
};

const formatDate = (date) => dateFormatter.format(new Date(date));

const getWebsiteUrl = (blog) => {
  if (!blog) return "";
  return blog.startsWith("http") ? blog : `https://${blog}`;
};

const getLanguageColor = (language) => languageColors[language] || "#667085";

const UserCard = () => {
  const { theme, user, repos, status } = useContext(DevFinderContext);
  const isLight = theme === "light";
  const isLoading = status === "loading" && !user;
  const surface = isLight
    ? "border-[#d8d0c2] bg-[#fffaf1] text-[#272018]"
    : "border-white/10 bg-[#191919] text-[#f4f1ea]";
  const subtleSurface = isLight
    ? "border-[#e3dbce] bg-[#f8f3e8]"
    : "border-white/10 bg-[#111111]";
  const mutedText = isLight ? "text-[#756d62]" : "text-[#a8a8a8]";

  if (isLoading || !user) {
    return (
      <div className={`focus-card float-in rounded-[24px] border p-4 min-[380px]:rounded-[32px] min-[380px]:p-6 ${surface}`}>
        <div className="animate-pulse space-y-5">
          <div className="flex items-center gap-4 min-[380px]:gap-5">
            <div className="h-20 w-20 rounded-3xl bg-black/10 min-[380px]:h-28 min-[380px]:w-28 dark:bg-white/10" />
            <div className="flex-1 space-y-3">
              <div className="h-8 w-2/3 rounded bg-black/10 dark:bg-white/10" />
              <div className="h-4 w-1/2 rounded bg-black/10 dark:bg-white/10" />
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="h-24 rounded-3xl bg-black/10 dark:bg-white/10" />
            <div className="h-24 rounded-3xl bg-black/10 dark:bg-white/10" />
            <div className="h-24 rounded-3xl bg-black/10 dark:bg-white/10" />
            <div className="h-24 rounded-3xl bg-black/10 dark:bg-white/10" />
          </div>
          <div className="h-72 rounded-3xl bg-black/10 dark:bg-white/10" />
        </div>
      </div>
    );
  }

  const websiteUrl = getWebsiteUrl(user.blog);
  const topRepos = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );
  const totalRepoStars = repos.reduce(
    (total, repo) => total + repo.stargazers_count,
    0
  );
  const languages = repos.reduce((acc, repo) => {
    if (!repo.language) return acc;
    acc[repo.language] = (acc[repo.language] || 0) + 1;
    return acc;
  }, {});
  const languageEntries = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  const languageTotal = languageEntries.reduce(
    (total, [, count]) => total + count,
    0
  );
  const profileStrength = [
    user.bio,
    user.location,
    user.blog,
    user.company,
    user.twitter_username,
  ].filter(Boolean).length;
  const profileScore = Math.round((profileStrength / 5) * 100);
  const accountAge = Math.max(
    1,
    new Date().getFullYear() - new Date(user.created_at).getFullYear()
  );

  const stats = [
    ["Repositories", user.public_repos],
    ["Followers", user.followers],
    ["Following", user.following],
    ["Sample stars", totalRepoStars],
  ];

  const links = [
    {
      label: user.location || "No location",
      icon: isLight ? locationDarkImage : locationImage,
      disabled: !user.location,
    },
    {
      label: user.blog
        ? user.blog.replace("https://", "").replace("http://", "")
        : "No website",
      icon: isLight ? websiteDarkIcon : websiteIcon,
      href: websiteUrl,
      disabled: !websiteUrl,
    },
    {
      label: user.twitter_username ? `@${user.twitter_username}` : "No Twitter",
      icon: twitterIcon,
      href: user.twitter_username
        ? `https://twitter.com/${user.twitter_username}`
        : "",
      disabled: !user.twitter_username,
    },
    {
      label: user.company || "No company",
      icon: isLight ? companyDarkIcon : companyIcon,
      disabled: !user.company,
    },
  ];

  return (
    <article className={`focus-card float-in overflow-hidden rounded-[24px] border min-[380px]:rounded-[32px] ${surface}`}>
      <div className="border-b border-[#d8d0c2] px-4 py-3 dark:border-white/10 min-[380px]:px-5 min-[380px]:py-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className={`break-words text-[10px] font-bold uppercase tracking-[0.16em] min-[380px]:text-xs min-[380px]:tracking-[0.22em] ${mutedText}`}>
            Dossier / {user.login}
          </p>
          <p className={`text-[10px] font-bold uppercase tracking-[0.12em] min-[380px]:text-xs min-[380px]:tracking-[0.16em] ${mutedText}`}>
            Updated from GitHub REST API
          </p>
        </div>
      </div>

      <div className="grid gap-0 xl:grid-cols-[360px_1fr]">
        <aside className="border-b border-[#d8d0c2] p-4 dark:border-white/10 min-[380px]:p-5 sm:p-6 xl:border-b-0 xl:border-r">
          <div className="flex flex-col gap-4 min-[380px]:gap-5">
            <div className="flex flex-col gap-4 min-[380px]:flex-row min-[380px]:items-start min-[380px]:gap-5">
              <img
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                className="h-24 w-24 rounded-[24px] object-cover ring-1 ring-black/10 min-[380px]:h-28 min-[380px]:w-28 min-[380px]:rounded-[28px] dark:ring-white/10"
              />
              <div className="min-w-0 pt-1">
                <p className={`text-[10px] font-bold uppercase tracking-[0.14em] min-[380px]:text-xs min-[380px]:tracking-[0.18em] ${mutedText}`}>
                  {user.type}
                </p>
                <h3 className="mt-2 break-words text-xl font-bold leading-tight min-[380px]:text-2xl">
                  {user.name || user.login}
                </h3>
                <p className="mt-2 text-sm font-bold text-[#1f6f5b] dark:text-[#8fb9a8]">
                  @{user.login}
                </p>
              </div>
            </div>

            <p className={`text-[13px] leading-6 min-[380px]:text-sm min-[380px]:leading-7 ${mutedText}`}>
              {user.bio ||
                "No public bio yet. Repository and account metadata still provide useful review signals."}
            </p>

            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit rounded-full bg-[#272018] px-4 py-2.5 text-sm font-bold text-[#fffaf1] transition hover:-translate-y-0.5 hover:bg-[#1f6f5b] min-[380px]:px-5 min-[380px]:py-3 dark:bg-[#f4f1ea] dark:text-[#111111] dark:hover:bg-[#8fb9a8]"
            >
              Open GitHub
            </a>

            <div className={`rounded-[22px] border p-3 min-[380px]:rounded-3xl min-[380px]:p-4 ${subtleSurface}`}>
              <div className="flex items-center justify-between">
                <p className={`text-[10px] font-bold uppercase tracking-[0.12em] min-[380px]:text-xs min-[380px]:tracking-[0.16em] ${mutedText}`}>
                  Profile score
                </p>
                <span className="text-xl font-bold">{profileScore}</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-[#1f6f5b] transition-all duration-500 dark:bg-[#8fb9a8]"
                  style={{ width: `${profileScore}%` }}
                />
              </div>
              <p className={`mt-3 text-xs leading-5 ${mutedText}`}>
                {profileStrength}/5 public signals: bio, location, website,
                company, social.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 min-[380px]:gap-3">
              {stats.map(([label, value]) => (
                <div key={label} className={`min-w-0 rounded-[22px] border p-3 min-[380px]:rounded-3xl min-[380px]:p-4 ${subtleSurface}`}>
                  <p className="text-xl font-bold min-[380px]:text-2xl">
                    {numberFormatter.format(value || 0)}
                  </p>
                  <p className={`mt-1 break-words text-[11px] font-bold min-[380px]:text-xs ${mutedText}`}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="p-4 min-[380px]:p-5 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <div className={`rounded-[24px] border p-4 min-[380px]:rounded-3xl min-[380px]:p-5 ${subtleSurface}`}>
              <p className={`text-[10px] font-bold uppercase tracking-[0.14em] min-[380px]:text-xs min-[380px]:tracking-[0.18em] ${mutedText}`}>
                Account notes
              </p>
              <div className="mt-4 grid gap-3 min-[420px]:grid-cols-3 min-[380px]:mt-5 min-[380px]:gap-4">
                <div>
                  <p className="text-xl font-bold min-[380px]:text-2xl">{accountAge}+ yrs</p>
                  <p className={`mt-1 text-xs ${mutedText}`}>
                    Since {formatDate(user.created_at)}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold min-[380px]:text-2xl">
                    {numberFormatter.format(user.public_gists || 0)}
                  </p>
                  <p className={`mt-1 text-xs ${mutedText}`}>Public gists</p>
                </div>
                <div>
                  <p className="text-xl font-bold min-[380px]:text-2xl">
                    {numberFormatter.format(repos.length)}
                  </p>
                  <p className={`mt-1 text-xs ${mutedText}`}>Repos sampled</p>
                </div>
              </div>
            </div>

            <div className={`rounded-[24px] border p-4 min-[380px]:rounded-3xl min-[380px]:p-5 ${subtleSurface}`}>
              <p className={`text-[10px] font-bold uppercase tracking-[0.14em] min-[380px]:text-xs min-[380px]:tracking-[0.18em] ${mutedText}`}>
                Language mix
              </p>
              <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                {languageEntries.length ? (
                  languageEntries.map(([language, count]) => (
                    <span
                      key={language}
                      style={{
                        width: `${(count / languageTotal) * 100}%`,
                        backgroundColor: getLanguageColor(language),
                      }}
                    />
                  ))
                ) : (
                  <span className="h-full w-full bg-black/20 dark:bg-white/20" />
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {languageEntries.length ? (
                  languageEntries.map(([language]) => (
                    <span
                      key={language}
                      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[11px] font-bold min-[380px]:px-3 min-[380px]:text-xs ${surface}`}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: getLanguageColor(language) }}
                      />
                      {language}
                    </span>
                  ))
                ) : (
                  <span className={`text-xs ${mutedText}`}>No language data</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-2 min-[380px]:gap-3 md:grid-cols-2">
            {links.map((item, index) => {
              const content = (
                <>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border min-[380px]:h-10 min-[380px]:w-10 ${surface}`}>
                    <img src={item.icon} alt="" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 truncate text-[13px] font-bold min-[380px]:text-sm">{item.label}</span>
                </>
              );

              return item.href ? (
                <a
                  key={`${item.label}-${index}`}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex min-w-0 items-center gap-2 rounded-[22px] border p-2.5 transition hover:-translate-y-0.5 hover:border-[#1f6f5b] hover:text-[#1f6f5b] min-[380px]:gap-3 min-[380px]:rounded-3xl min-[380px]:p-3 ${subtleSurface}`}
                >
                  {content}
                </a>
              ) : (
                <div
                  key={`${item.label}-${index}`}
                  className={`flex min-w-0 items-center gap-2 rounded-[22px] border p-2.5 min-[380px]:gap-3 min-[380px]:rounded-3xl min-[380px]:p-3 ${
                    item.disabled ? mutedText : ""
                  } ${subtleSurface}`}
                >
                  {content}
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <div className="flex flex-col gap-2 border-b border-[#d8d0c2] pb-3 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-[0.14em] min-[380px]:text-xs min-[380px]:tracking-[0.18em] ${mutedText}`}>
                  Repository evidence
                </p>
                <h3 className="mt-2 text-xl font-bold min-[380px]:text-2xl">Notable public work</h3>
              </div>
              <p className={`text-[10px] font-bold uppercase tracking-[0.12em] min-[380px]:text-xs min-[380px]:tracking-[0.16em] ${mutedText}`}>
                Sorted by stars
              </p>
            </div>

            <div className="mt-3 divide-y divide-[#d8d0c2] overflow-hidden rounded-[24px] border border-[#d8d0c2] min-[380px]:rounded-3xl dark:divide-white/10 dark:border-white/10">
              {topRepos.slice(0, 6).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className={`grid gap-3 p-3 transition hover:bg-[#f8f3e8] min-[380px]:p-4 dark:hover:bg-white/[0.04] md:grid-cols-[1fr_auto] ${isLight ? "bg-[#fffaf1]" : "bg-[#191919]"}`}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="max-w-full truncate text-base font-bold min-[380px]:text-lg">{repo.name}</h4>
                      {repo.language && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-current/20 px-2 py-1 text-[10px] font-bold min-[380px]:px-2.5 min-[380px]:text-[11px]">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          />
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <p className={`mt-2 line-clamp-2 text-[13px] leading-6 min-[380px]:text-sm ${mutedText}`}>
                      {repo.description || "No description provided."}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold min-[380px]:gap-x-4 min-[380px]:text-sm md:justify-end">
                    <span>{numberFormatter.format(repo.stargazers_count)} stars</span>
                    <span>{numberFormatter.format(repo.forks_count)} forks</span>
                    <span className={mutedText}>{formatDate(repo.updated_at)}</span>
                  </div>
                </a>
              ))}

              {topRepos.length === 0 && (
                <div className={`p-5 ${isLight ? "bg-[#fffaf1]" : "bg-[#191919]"}`}>
                  <p className={mutedText}>
                    No public repositories found for this profile.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default UserCard;
