import React from "react";

const TroubleshootingGuide = () => {
  const troubleshootingSteps = [
    {
      title: "Video Not Loading",
      steps: [
        "Try switching between SUB and DUB options",
        "Switch to a different server (VidWish or MegaPlay)",
        "Disable ad blockers temporarily",
        "Check your internet connection",
        "Try refreshing the page"
      ]
    },
    {
      title: "API Errors",
      steps: [
        "Check if the API server is online",
        "Verify your network connection",
        "Try accessing a different episode or anime",
        "Clear browser cache and cookies",
        "Wait a few minutes and try again"
      ]
    },
    {
      title: "General Issues",
      steps: [
        "Update your browser to the latest version",
        "Disable browser extensions that might interfere",
        "Try using a different browser",
        "Check if your ISP is blocking streaming sites",
        "Use a VPN if content is geo-blocked"
      ]
    }
  ];

  return (
    <div className="bg-lightbg rounded-md p-6 m-4">
      <h2 className="text-xl font-bold text-primary mb-4">Troubleshooting Guide</h2>
      
      <div className="space-y-6">
        {troubleshootingSteps.map((section, index) => (
          <div key={index} className="border-b border-gray-600 pb-4 last:border-b-0">
            <h3 className="text-lg font-semibold text-white mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="flex items-start text-gray-300">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-900 bg-opacity-30 rounded-md">
        <h4 className="text-yellow-400 font-semibold mb-2">Important Note:</h4>
        <p className="text-sm text-gray-300">
          This anime streaming site relies on external video servers. Some content may be temporarily 
          unavailable due to server maintenance, licensing restrictions, or geographic limitations.
        </p>
      </div>
    </div>
  );
};

export default TroubleshootingGuide;