import { useState, useEffect } from "react";
import { useApi } from "../services/useApi";

const StatusChecker = () => {
  const [apiStatus, setApiStatus] = useState("checking");
  const [serverStatus, setServerStatus] = useState({
    vidWish: "checking",
    megaPlay: "checking"
  });

  // Check API status
  const { data: homeData, isLoading, isError } = useApi("/home");

  useEffect(() => {
    if (isLoading) {
      setApiStatus("checking");
    } else if (isError) {
      setApiStatus("error");
    } else if (homeData) {
      setApiStatus("online");
    }
  }, [homeData, isLoading, isError]);

  // Check video server status (simplified check)
  useEffect(() => {
    const checkVideoServers = async () => {
      const servers = ["vidWish", "megaPlay"];
      
      for (const server of servers) {
        try {
          // This is a simplified check - in reality, we'd need to test actual video URLs
          setServerStatus(prev => ({ ...prev, [server]: "unknown" }));
        } catch {
          setServerStatus(prev => ({ ...prev, [server]: "error" }));
        }
      }
    };

    checkVideoServers();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "online": return "text-green-400";
      case "error": return "text-red-400";
      case "checking": return "text-yellow-400";
      default: return "text-gray-400";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "online": return "Online";
      case "error": return "Offline";
      case "checking": return "Checking...";
      default: return "Unknown";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-lightbg rounded-md p-4 text-sm max-w-xs">
      <h4 className="font-bold text-primary mb-2">Service Status</h4>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>API Server:</span>
          <span className={getStatusColor(apiStatus)}>
            {getStatusText(apiStatus)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>VidWish Server:</span>
          <span className={getStatusColor(serverStatus.vidWish)}>
            {getStatusText(serverStatus.vidWish)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>MegaPlay Server:</span>
          <span className={getStatusColor(serverStatus.megaPlay)}>
            {getStatusText(serverStatus.megaPlay)}
          </span>
        </div>
      </div>
      
      {apiStatus === "error" && (
        <div className="mt-3 p-2 bg-red-900 bg-opacity-30 rounded text-xs">
          API connection failed. Check your internet connection or try again later.
        </div>
      )}
    </div>
  );
};

export default StatusChecker;