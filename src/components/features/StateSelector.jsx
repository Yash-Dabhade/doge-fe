import { MapPin } from "lucide-react";

// Component for selecting current and destination states
function StateSelector() {
  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6">
      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="h-6 w-6" />
        <h2 className="text-xl font-semibold">Select States</h2>
      </div>
      <div className="space-y-2">
        <button className="w-full h-10 flex items-center justify-between px-4 bg-white bg-opacity-20 rounded-md hover:bg-opacity-25 transition-colors">
          <span>Current State</span>
          <MapPin className="h-4 w-4" />
        </button>
        <button className="w-full h-10 flex items-center justify-between px-4 bg-white bg-opacity-20 rounded-md hover:bg-opacity-25 transition-colors">
          <span>Destination State</span>
          <MapPin className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default StateSelector;
