import { MapPin } from "lucide-react";

// Header component with app logo and title
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center">
        <div className="flex items-center space-x-2">
          {/* <MapPin className="h-6 w-6 text-blue-600" /> */}
          <img src="/usa.png" className="h-12 " />
          <h1 className="text-xl font-bold text-slate-800">StateShift</h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
