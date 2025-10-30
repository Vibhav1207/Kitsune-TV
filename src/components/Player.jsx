/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import VideoPlayer from "./VideoPlayer";

const Player = ({
  episodeId,
  currentEp,
  changeEpisode,
  hasNextEp,
  hasPrevEp,
}) => {
  const [category, setCategory] = useState("sub");
  const [server, setServer] = useState("megaPlay");

  const changeCategory = (newType) => {
    if (newType !== category) {
      setCategory(newType);
    }
  };
  
  function changeServer(newServer) {
    if (newServer !== server) {
      setServer(newServer);
    }
  }

  const episodeNumber = episodeId.split("ep=").pop();

  return (
    <>
      <VideoPlayer 
        episodeId={episodeNumber}
        category={category}
        server={server}
      />
      <div className="category flex flex-wrap flex-col sm:flex-row items-center justify-center  sm:justify-between px-2 md:px-20 gap-3 bg-lightbg py-2">
        <div className="servers flex gap-4">
          <button
            onClick={() => changeServer("vidWish")}
            className={`${
              server === "vidWish"
                ? "bg-primary text-black"
                : "bg-btnbg  text-white"
            } px-2 py-1 rounded text-sm font-semibold`}
          >
            vidwish
          </button>
          <button
            onClick={() => changeServer("megaPlay")}
            className={`${
              server === "megaPlay"
                ? "bg-primary text-black"
                : "bg-btnbg  text-white"
            } px-2 py-1 rounded text-sm font-semibold`}
          >
            megaplay
          </button>
        </div>
        <div className="flex gap-5">
          <div className="sound flex gap-3">
            {["sub", "dub"].map((type) => (
              <button
                key={type}
                onClick={() => changeCategory(type)}
                className={`${
                  category === type
                    ? "bg-primary text-black"
                    : "bg-btnbg  text-white"
                } px-2 py-1 rounded text-sm font-semibold`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="btns flex gap-4">
            {hasPrevEp && (
              <button
                title="prev"
                className="prev bg-primary px-2 py-1 rounded-md text-black"
                onClick={() => changeEpisode("prev")}
              >
                <TbPlayerTrackPrevFilled />
              </button>
            )}
            {hasNextEp && (
              <button
                title="next"
                className="next bg-primary px-2 py-1 rounded-md text-black"
                onClick={() => changeEpisode("next")}
              >
                <TbPlayerTrackNextFilled />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-400">
            you are watching Episode {currentEp.episodeNumber}
          </p>
          {currentEp.isFiller && (
            <p className="text-red-400">your are watching filler Episode 👻</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
