import { io } from "socket.io-client";
import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import PresenceIndicator from "./components/PresenceIndicator";

let socket;

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    if (isConnected) {
      socket.disconnect();
      setIsConnected(false);
    } else {
      socket = io("http://localhost:8080", {
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });
    }
  };

  return (
    <div className="app">
      <PresenceIndicator isConnected={isConnected} />
      <Button handleClick={handleConnect}>
        {" "}
        {isConnected ? "Disconnect" : "Connect"}{" "}
      </Button>
    </div>
  );
}

export default App;
