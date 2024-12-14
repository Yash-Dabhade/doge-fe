import React, { useState } from "react";
import {
  Phone,
  Heart,
  Shield,
  Flame,
  AlertTriangle,
  Search,
  Navigation,
  Bell,
  Hospital,
  Car,
  CloudLightning,
  Info,
} from "lucide-react";

const Emergency = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userLocation, setUserLocation] = useState(null);

  // Emergency categories with their respective services
  const emergencyServices = {
    medical: [
      {
        id: 1,
        name: "General Emergency",
        number: "911",
        description:
          "For life-threatening emergencies requiring immediate medical attention",
        available: "24/7",
        icon: <AlertTriangle className="w-6 h-6" />,
        priority: "high",
      },
      {
        id: 2,
        name: "State General Hospital",
        number: "555-0123",
        description: "Level 1 Trauma Center with comprehensive emergency care",
        address: "123 Medical Center Dr",
        available: "24/7",
        icon: <Hospital className="w-6 h-6" />,
        priority: "high",
      },
      {
        id: 3,
        name: "Poison Control Center",
        number: "800-222-1222",
        description: "Expert advice for poison emergencies",
        available: "24/7",
        icon: <AlertTriangle className="w-6 h-6" />,
        priority: "medium",
      },
    ],
    fire: [
      {
        id: 4,
        name: "Fire Emergency",
        number: "911",
        description: "For fire emergencies and rescue services",
        available: "24/7",
        icon: <Flame className="w-6 h-6" />,
        priority: "high",
      },
    ],
    police: [
      {
        id: 5,
        name: "Police Emergency",
        number: "911",
        description: "For crime reporting and immediate police assistance",
        available: "24/7",
        icon: <Shield className="w-6 h-6" />,
        priority: "high",
      },
      {
        id: 6,
        name: "Non-Emergency Police",
        number: "555-0456",
        description: "For non-emergency police matters and inquiries",
        available: "24/7",
        icon: <Shield className="w-6 h-6" />,
        priority: "medium",
      },
    ],
    disaster: [
      {
        id: 7,
        name: "Emergency Management Agency",
        number: "555-0789",
        description: "Natural disaster response and coordination",
        available: "24/7",
        icon: <CloudLightning className="w-6 h-6" />,
        priority: "high",
      },
    ],
    roadside: [
      {
        id: 8,
        name: "Highway Patrol",
        number: "555-0321",
        description: "Highway emergencies and road assistance",
        available: "24/7",
        icon: <Car className="w-6 h-6" />,
        priority: "medium",
      },
    ],
  };

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  // Filter services based on search and category
  const getFilteredServices = () => {
    let services = [];
    Object.entries(emergencyServices).forEach(
      ([category, categoryServices]) => {
        if (selectedCategory === "all" || selectedCategory === category) {
          services = [...services, ...categoryServices];
        }
      }
    );

    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white p-4 rounded-lg mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-8 h-8 animate-pulse" />
          <div>
            <h1 className="text-2xl font-bold">Emergency Services</h1>
            <p className="text-red-100">
              For immediate life-threatening emergencies, always call 911
            </p>
          </div>
        </div>
        <button
          onClick={getCurrentLocation}
          className="bg-white text-red-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-50"
        >
          <Navigation className="w-5 h-5" />
          Share Location
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search emergency services..."
              className="w-full p-3 pl-10 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Info className="w-5 h-5" />
            All Services
          </button>
          <button
            onClick={() => setSelectedCategory("medical")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap ${
              selectedCategory === "medical"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Heart className="w-5 h-5" />
            Medical
          </button>
          <button
            onClick={() => setSelectedCategory("fire")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap ${
              selectedCategory === "fire"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Flame className="w-5 h-5" />
            Fire
          </button>
          <button
            onClick={() => setSelectedCategory("police")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap ${
              selectedCategory === "police"
                ? "bg-blue-800 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Shield className="w-5 h-5" />
            Police
          </button>
          <button
            onClick={() => setSelectedCategory("disaster")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap ${
              selectedCategory === "disaster"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <CloudLightning className="w-5 h-5" />
            Disaster
          </button>
          <button
            onClick={() => setSelectedCategory("roadside")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap ${
              selectedCategory === "roadside"
                ? "bg-yellow-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Car className="w-5 h-5" />
            Roadside
          </button>
        </div>
      </div>

      {/* Emergency Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getFilteredServices().map((service) => (
          <div
            key={service.id}
            className={`p-4 rounded-lg border ${
              service.priority === "high"
                ? "border-red-200 bg-red-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  service.priority === "high"
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {service.description}
                </p>
                <a
                  href={`tel:${service.number}`}
                  className="inline-flex items-center gap-2 text-lg font-bold text-blue-600"
                >
                  <Phone className="w-5 h-5" />
                  {service.number}
                </a>
                {service.address && (
                  <p className="text-sm text-gray-500 mt-2">
                    <Navigation className="w-4 h-4 inline mr-1" />
                    {service.address}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {service.available}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips Section */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          Emergency Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded-lg">
            <h3 className="font-medium mb-2">Stay Calm</h3>
            <p className="text-sm text-gray-600">
              Remain calm and speak clearly when calling emergency services
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <h3 className="font-medium mb-2">Know Your Location</h3>
            <p className="text-sm text-gray-600">
              Be ready to provide your exact location or landmarks nearby
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <h3 className="font-medium mb-2">Follow Instructions</h3>
            <p className="text-sm text-gray-600">
              Listen carefully and follow dispatcher instructions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
