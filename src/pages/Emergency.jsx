import React, { useState, useEffect } from "react";
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
  Loader,
} from "lucide-react";
import { stateEmergencyData } from "../data/emergencyContacts.js";

const Emergency = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const serviceIcons = {
    "General Emergency": <AlertTriangle className="w-6 h-6" />,
    Medical: <Heart className="w-6 h-6" />,
    Hospital: <Hospital className="w-6 h-6" />,
    Fire: <Flame className="w-6 h-6" />,
    Police: <Shield className="w-6 h-6" />,
    Disaster: <CloudLightning className="w-6 h-6" />,
    Roadside: <Car className="w-6 h-6" />,
  };

  useEffect(() => {
    loadStateServices();
  }, []);

  const loadStateServices = () => {
    try {
      const destination = localStorage.getItem("destination") || "Georgia";
      const stateServices = stateEmergencyData[destination];

      if (!stateServices) {
        throw new Error(
          `No emergency services data available for ${destination}`
        );
      }

      setServices(stateServices);
      setError(null);
    } catch (err) {
      setError(err.message);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

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
          setError(
            "Could not get your current location. Please check your browser settings."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const getFilteredServices = () => {
    return services.filter((service) => {
      return (
        service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const getServiceIcon = (service) => {
    if (!service?.type) return <AlertTriangle className="w-6 h-6" />;
    const serviceType = Object.keys(serviceIcons).find((key) =>
      service.type.toLowerCase().includes(key.toLowerCase())
    );
    return serviceIcons[serviceType] || <AlertTriangle className="w-6 h-6" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
        <div className="flex flex-col items-center justify-between gap-4">
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
            className="bg-white text-red-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-50 w-full justify-center"
          >
            <Navigation className="w-5 h-5" />
            Share Location
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}

      <div className="mb-6">
        <div className="flex flex-col gap-4 mb-4">
          <div className="relative">
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
      </div>

      <div className="grid grid-cols-1 gap-4">
        {getFilteredServices().map((service, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              service.type?.toLowerCase().includes("emergency")
                ? "border-red-200 bg-red-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  service.type?.toLowerCase().includes("emergency")
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                {getServiceIcon(service)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {service.description}
                </p>
                <a
                  href={`tel:${service.contact?.phone}`}
                  className="inline-flex items-center gap-2 text-lg font-bold text-blue-600"
                >
                  <Phone className="w-5 h-5" />
                  {service.contact?.phone}
                </a>
                {service.contact?.address && (
                  <p className="text-sm text-gray-500 mt-2">
                    <Navigation className="w-4 h-4 inline mr-1" />
                    {service.contact.address}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {service.contact?.hours || "24/7"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          Emergency Tips
        </h2>
        <div className="grid grid-cols-1 gap-4">
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
