import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CacheSimulator from "./components/CacheSimulator";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "simulator":
        return <CacheSimulator />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
      <ScrollToTop />
    </div>
  );
}

export default App;
