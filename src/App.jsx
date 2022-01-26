import React from "react";
import "./App.css";
import Scene from "./Canvas/Scene";
import { Canvas } from "react-three-fiber";

function App() {

  return (
    <React.Fragment>

      <Canvas id="rtfCanvas">
        <Scene />
      </Canvas>

    </React.Fragment>
  );
}

export default App;