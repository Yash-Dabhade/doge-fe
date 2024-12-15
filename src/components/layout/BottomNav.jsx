import { Home, Map, FileText, Bell, Bot, Book } from "lucide-react";

// Navigation items configuration
const navItems = [
  { icon: Home, label: "Home", value: "home" },
  { icon: Book, label: "Laws", value: "laws" },
  { icon: Bot, label: "Assistant", value: "assistant" },
  { icon: Bell, label: "Emergency", value: "emergency" },
  { icon: Map, label: "Map", value: "map" },
];

// Bottom navigation component with mobile-friendly design
function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ icon: Icon, label, value }) => (
            <button
              key={value}
              onClick={() => onTabChange(value)}
              className={`flex flex-col items-center justify-center w-16 p-1 ${
                activeTab === value ? "text-blue-500" : "text-gray-600"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
