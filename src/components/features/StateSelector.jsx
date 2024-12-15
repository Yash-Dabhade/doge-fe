import { MapPinOff, MapPin, ChevronDown } from "lucide-react";

function StateSelector({
  sourceState,
  setSourceState,
  destinationState,
  setDestinationState,
  availableStates,
}) {
  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6">
      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="h-6 w-6" />
        <h2 className="text-xl font-semibold">Select States</h2>
      </div>
      <div className="space-y-4">
        {/* Source State Selector */}
        <div className="relative">
          <label className="block text-sm mb-1 text-blue-100">
            Moving From
          </label>
          <div className="relative flex items-center">
            <MapPinOff className="absolute left-3 h-5 w-5 text-blue-200" />
            <select
              value={sourceState}
              onChange={(e) => setSourceState(e.target.value)}
              className="w-full h-12 pl-10 pr-10 
                       bg-white/10 backdrop-blur-lg
                       rounded-md appearance-none cursor-pointer 
                       text-white border border-white/20
                       hover:bg-white/20 transition-all
                       focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {availableStates.map((state) => (
                <option
                  key={state}
                  value={state}
                  className="bg-blue-600/90 backdrop-blur-lg text-white py-2"
                >
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 h-5 w-5 text-blue-200 pointer-events-none" />
          </div>
        </div>

        {/* Destination State Selector */}
        <div className="relative">
          <label className="block text-sm mb-1 text-blue-100">Moving To</label>
          <div className="relative flex items-center">
            <MapPin className="absolute left-3 h-5 w-5 text-blue-200" />
            <select
              value={destinationState}
              onChange={(e) => setDestinationState(e.target.value)}
              className="w-full h-12 pl-10 pr-10 
                       bg-white/10 backdrop-blur-lg
                       rounded-md appearance-none cursor-pointer 
                       text-white border border-white/20
                       hover:bg-white/20 transition-all
                       focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {availableStates.map((state) => (
                <option
                  key={state}
                  value={state}
                  className="bg-blue-600/90 backdrop-blur-lg text-white py-2"
                >
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 h-5 w-5 text-blue-200 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StateSelector;
