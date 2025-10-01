import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import Player from "../components/Player";
import Episodes from "../layouts/Episodes";
import { useApi } from "../services/useApi";
import PageNotFound from "./PageNotFound";
import { MdTableRows } from "react-icons/md";
import { HiMiniViewColumns } from "react-icons/hi2";
import { Helmet } from "react-helmet";

const WatchPage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [layout, setLayout] = useState("row");

  const ep = searchParams.get("ep");

  const { data, isError, error, isLoading } = useApi(`/episodes/${id}`);
  const episodes = data?.data;

  const updateParams = (newParam) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("ep", newParam);
      return newParams;
    });
  };

  // Auto-redirect to first episode if no `ep` param exists
  useEffect(() => {
    if (!ep && Array.isArray(episodes) && episodes.length > 0) {
      const ep = episodes[0].id.split("ep=").pop();
      updateParams(ep);
    }
  }, [ep, episodes, setSearchParams]);

  if (isError) {
    console.error("Error fetching episodes:", error);
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-white">
        <h1 className="text-2xl mb-4 text-red-400">Error Loading Episodes</h1>
        <p className="text-gray-300 text-center mb-4">
          {error?.message || "Failed to load episode data. Please try again later."}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-primary text-black px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading || !episodes) {
    return <Loader className="h-screen" />;
  }

  const currentEp =
    episodes &&
    ep !== null &&
    episodes.find((e) => e.id.split("ep=").pop() === ep);

  // If we can't find the current episode, default to the first one
  const safeCurrentEp = currentEp || (episodes && episodes[0]);

  if (!safeCurrentEp) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-white">
        <h1 className="text-2xl mb-4 text-red-400">Episode Not Found</h1>
        <p className="text-gray-300 text-center mb-4">
          The requested episode could not be found.
        </p>
        <Link to="/home" className="bg-primary text-black px-4 py-2 rounded">
          Go to Home
        </Link>
      </div>
    );
  }

  const changeEpisode = (action) => {
    if (action === "next") {
      const nextEp = episodes[safeCurrentEp.episodeNumber - 1 + 1];
      if (!nextEp) return;
      updateParams(nextEp.id.split("ep=").pop());
    } else {
      const prevEp = episodes[safeCurrentEp.episodeNumber - 1 - 1];
      if (!prevEp) return;
      updateParams(prevEp.id.split("ep=").pop());
    }
  };

  const hasNextEp = Boolean(episodes[safeCurrentEp.episodeNumber - 1 + 1]);
  const hasPrevEp = Boolean(episodes[safeCurrentEp.episodeNumber - 1 - 1]);

  return (
    /* WatchPage.js */
    <div className="bg-backGround pt-14 max-w-screen-xl mx-auto py-2 md:px-2">
      <Helmet>
        <title>
          Watch {id.split("-").slice(0, 2).join(" ")} Online, Free Anime
          Streaming Online on KitsuneTV Anime Website
        </title>
        <meta property="og:title" content="watch - KitsuneTV" />
      </Helmet>
      <div className="flex flex-col gap-2">
        <div className="path flex mb-2 mx-2 items-center gap-2 text-base ">
          <Link className="" to="/home">
            <h4 className="hover:text-primary">home</h4>
          </Link>
          <span className="h-1 w-1 rounded-full bg-primary"></span>
          <Link to={`/anime/${id}`}>
            <h4 className="hover:text-primary">
              {id.split("-").slice(0, 2).join(" ")}
            </h4>
          </Link>
          <span className="h-1 w-1 rounded-full bg-primary"></span>
          <h4 className="gray">{`episode ${safeCurrentEp.episodeNumber}`}</h4>
        </div>
        {ep && id && (
          <Player
            id={id}
            episodeId={`${id}?ep=${ep}`}
            currentEp={safeCurrentEp}
            changeEpisode={changeEpisode}
            hasNextEp={hasNextEp}
            hasPrevEp={hasPrevEp}
          />
        )}
        <div className="input w-full mt-2 flex items-end justify-end gap-3 text-end">
          <div className="btns bg-btnbg flex mx-2 rounded-child">
            <button
              className={`row item p-2 ${
                layout === "row" ? "bg-primary text-black" : undefined
              }`}
              onClick={() => setLayout("row")}
            >
              <MdTableRows size={"20px"} />
            </button>
            <button
              className={`column item p-2 ${
                layout === "column" ? "bg-primary text-black" : undefined
              }`}
              onClick={() => setLayout("column")}
            >
              <HiMiniViewColumns size={"20px"} />
            </button>
          </div>
        </div>
        <ul
          className={`episodes max-h-[50vh] py-4 px-2 overflow-scroll bg-lightbg grid gap-1  md:gap-2 ${
            layout === "row"
              ? " grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : " grid-cols-5 md:grid-cols-10"
          }`}
        >
          {episodes?.map((episode) => (
            <Episodes
              key={episode.id}
              episode={episode}
              currentEp={safeCurrentEp}
              layout={layout}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WatchPage;
