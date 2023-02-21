import { io } from "socket.io-client";
import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import PresenceIndicator from "./components/PresenceIndicator";

let socket;

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    socket = io("http://localhost:8080", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      setIsConnected(true);
    });
  };

  return (
    <div className="app">
      <PresenceIndicator isConnected={isConnected} />
      <Button handleClick={handleConnect}> {
        isConnected ? "Disconnect" : "Connect"
      } </Button>
    </div>
  );
}

export default App;
