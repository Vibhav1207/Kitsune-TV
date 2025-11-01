/* eslint-disable react/prop-types */
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const AlternativePlayer = ({ episodeId, category, server }) => {
  const [showAlternatives, setShowAlternatives] = useState(false);

  // Alternative video sources and formats
  const alternativeSources = [
    {
      name: "Direct Stream",
      url: `https://api.animestream.cc/v1/embed/${episodeId}/${category}`,
      type: "embed"
    },
    {
      name: "Mirror 1",
      url: `https://streamtape.com/e/${episodeId}`,
      type: "embed"
    },
    {
      name: "Mirror 2", 
      url: `https://mp4upload.com/embed-${episodeId}.html`,
      type: "embed"
    }
  ];

  return (
    <div className="w-full">
      <VideoPlayer 
        episodeId={episodeId}
        category={category}
        server={server}
      />
      
      <div className="mt-4 bg-lightbg rounded-md p-4">
        <button
          onClick={() => setShowAlternatives(!showAlternatives)}
          className="text-primary hover:underline text-sm"
        >
          {showAlternatives ? "Hide" : "Show"} Alternative Sources
        </button>
        
        {showAlternatives && (
          <div className="mt-3">
            <p className="text-sm text-gray-400 mb-3">
              If the main video doesn't work, try these alternative sources:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {alternativeSources.map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  className="block p-2 bg-btnbg rounded text-center text-sm hover:bg-primary hover:text-black transition-colors"
                >
                  {source.name}
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Note: Some sources may require disabling ad blockers or may redirect to external sites.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlternativePlayer;