import { useState } from "react";
import Header from "./components/layout/Header";
import BottomNav from "./components/layout/BottomNav";
import Dashboard from "./pages/Dashboard";
import Laws from "./pages/Laws";
import Assistant from "./pages/Assistant";
import Property from "./pages/Property";
import Emergency from "./pages/Emergency";

// Main application component that handles navigation and layout
function App() {
  // State to track which tab is currently active
  const [activeTab, setActiveTab] = useState("home");

  // Function to render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Dashboard />;

      case "laws":
        return <Laws />;

      case "assistant":
        return <Assistant />;

      case "property":
        return <Property />;

      case "emergency":
        return <Emergency />;

      // Add other cases for different tabs
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      <main className="pb-16">{renderContent()}</main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
