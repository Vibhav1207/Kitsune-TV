/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const VideoPlayer = ({ episodeId, category, server }) => {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 3;

  const servers = {
    vidWish: "vidwish.live",
    megaPlay: "megaplay.buzz",
    backup1: "vidwish.live",
    backup2: "megaplay.buzz",
  };

  // Different path variants seen across hosts; try sequentially
  const pathVariants = [
    (host) => `https://${host}/stream/s-2/${episodeId}/${category}`,
    (host) => `https://${host}/stream/s-4/${episodeId}/${category}`,
    (host) => `https://${host}/stream/s-1/${episodeId}/${category}`,
    (host) => `https://${host}/stream/s-3/${episodeId}/${category}`,
  ];

  const [variantIndex, setVariantIndex] = useState(0);
  const host = servers[server] || servers.vidWish;
  const videoUrl = pathVariants[variantIndex](host);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setVideoError(false);
    setRetryCount(0);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    // Advance to next path variant first, then fall back to retries
    setVariantIndex((idx) => {
      if (idx < pathVariants.length - 1) {
        setTimeout(() => {
          setIsLoading(true);
          setVideoError(false);
        }, 200);
        return idx + 1;
      }
      // All variants tried, use timed retries
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          setIsLoading(true);
          setVideoError(false);
        }, 2000);
      } else {
        setVideoError(true);
      }
      return idx;
    });
  };

  // Reset state when props change
  useEffect(() => {
    setVideoError(false);
    setIsLoading(true);
    setRetryCount(0);
    setVariantIndex(0);
  }, [episodeId, category, server]);

  if (videoError) {
    return (
      <div className="w-full aspect-video bg-gray-800 flex flex-col items-center justify-center text-white rounded-sm">
        <div className="text-center p-8">
          <h3 className="text-xl mb-4">Video Unavailable</h3>
          <p className="text-gray-300 mb-4">
            This video is currently unavailable. This could be due to:
          </p>
          <ul className="text-left text-sm text-gray-400 mb-6 max-w-md">
            <li>• Server maintenance or downtime</li>
            <li>• Geographic restrictions</li>
            <li>• Network connectivity issues</li>
            <li>• Content licensing restrictions</li>
          </ul>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setVideoError(false);
                setIsLoading(true);
                setRetryCount(0);
              }}
              className="bg-primary text-black px-6 py-2 rounded-md hover:opacity-80"
            >
              Try Again
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Try switching servers or check back later
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video relative rounded-sm overflow-hidden bg-gray-900">
      {/* Manual route switch control */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => setVariantIndex((idx) => (idx + 1) % pathVariants.length)}
          className="px-2 py-1 text-xs bg-primary text-black rounded hover:opacity-80"
          title="Switch stream route"
        >
          Switch Route
        </button>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-white mt-4">Loading video...</p>
            {retryCount > 0 && (
              <p className="text-sm text-gray-400 mt-2">
                Retry attempt {retryCount}/{maxRetries}
              </p>
            )}
          </div>
        </div>
      )}
      
      <iframe
        key={`${episodeId}-${category}-${server}-${retryCount}`} // Force re-render on changes
        src={videoUrl}
        width="100%"
        height="100%"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        title={`Episode ${episodeId} - ${category}`}
        className="border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default VideoPlayer;