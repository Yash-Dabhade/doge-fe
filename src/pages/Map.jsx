import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";

const stateCapitals = [
  { name: "Montgomery, AL", position: [32.377716, -86.300568] },
  { name: "Juneau, AK", position: [58.301598, -134.420212] },
  { name: "Phoenix, AZ", position: [33.448143, -112.096962] },
  { name: "Little Rock, AR", position: [34.746613, -92.288986] },
  { name: "Sacramento, CA", position: [38.576668, -121.493629] },
  { name: "Denver, CO", position: [39.739227, -104.984856] },
  { name: "Hartford, CT", position: [41.764046, -72.682198] },
  { name: "Dover, DE", position: [39.157307, -75.519722] },
  { name: "Tallahassee, FL", position: [30.438118, -84.281296] },
  { name: "Atlanta, GA", position: [33.749027, -84.388229] },
  { name: "Honolulu, HI", position: [21.307442, -157.857376] },
  { name: "Boise, ID", position: [43.617775, -116.199722] },
  { name: "Springfield, IL", position: [39.798363, -89.654961] },
  { name: "Indianapolis, IN", position: [39.768623, -86.162643] },
  { name: "Des Moines, IA", position: [41.591087, -93.603729] },
  { name: "Topeka, KS", position: [39.048191, -95.677956] },
  { name: "Frankfort, KY", position: [38.186722, -84.875374] },
  { name: "Baton Rouge, LA", position: [30.457069, -91.187393] },
  { name: "Augusta, ME", position: [44.307167, -69.781693] },
  { name: "Annapolis, MD", position: [38.978764, -76.490936] },
  { name: "Boston, MA", position: [42.358162, -71.063698] },
  { name: "Lansing, MI", position: [42.733635, -84.555328] },
  { name: "St. Paul, MN", position: [44.955097, -93.102211] },
  { name: "Jackson, MS", position: [32.303848, -90.182106] },
  { name: "Jefferson City, MO", position: [38.579201, -92.172935] },
  { name: "Helena, MT", position: [46.585709, -112.018417] },
  { name: "Lincoln, NE", position: [40.808075, -96.699654] },
  { name: "Carson City, NV", position: [39.163914, -119.766121] },
  { name: "Concord, NH", position: [43.206898, -71.537994] },
  { name: "Trenton, NJ", position: [40.220596, -74.769913] },
  { name: "Santa Fe, NM", position: [35.68224, -105.939728] },
  { name: "Albany, NY", position: [42.652843, -73.757874] },
  { name: "Raleigh, NC", position: [35.78043, -78.639099] },
  { name: "Bismarck, ND", position: [46.82085, -100.783318] },
  { name: "Columbus, OH", position: [39.961346, -82.999069] },
  { name: "Oklahoma City, OK", position: [35.492207, -97.503342] },
  { name: "Salem, OR", position: [44.938461, -123.030403] },
  { name: "Harrisburg, PA", position: [40.264378, -76.883598] },
  { name: "Providence, RI", position: [41.830914, -71.414825] },
  { name: "Columbia, SC", position: [34.000343, -81.033211] },
  { name: "Pierre, SD", position: [44.367031, -100.346405] },
  { name: "Nashville, TN", position: [36.16581, -86.784241] },
  { name: "Austin, TX", position: [30.27467, -97.740349] },
  { name: "Salt Lake City, UT", position: [40.777477, -111.888237] },
  { name: "Montpelier, VT", position: [44.262436, -72.580536] },
  { name: "Richmond, VA", position: [37.538857, -77.43364] },
  { name: "Olympia, WA", position: [47.035805, -122.905014] },
  { name: "Charleston, WV", position: [38.336246, -81.612328] },
  { name: "Madison, WI", position: [43.074684, -89.384445] },
  { name: "Cheyenne, WY", position: [41.140259, -104.820236] },
];

const markerIcon = new Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Map = () => {
  const [selectedCity, setSelectedCity] = useState(() => stateCapitals[0]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && selectedCity) {
      const map = mapRef.current;
      map.flyTo(selectedCity.position, 13);
    }
  }, [selectedCity]);

  const handleCityChange = (event) => {
    const cityName = event.target.value;
    const city = stateCapitals.find((city) => city.name === cityName);
    setSelectedCity(city);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4">
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          Select a state capital:
        </label>
        <div className="mt-1 relative">
          <select
            id="city"
            name="city"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedCity?.name || ""}
            onChange={handleCityChange}
          >
            {stateCapitals.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <MapContainer
          center={selectedCity?.position || [37.0902, -95.7129]}
          zoom={4}
          style={{ height: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {selectedCity && (
            <Marker position={selectedCity.position} icon={markerIcon} />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
