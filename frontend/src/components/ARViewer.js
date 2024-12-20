import React, { useEffect, useRef } from "react";
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, SceneLoader } from "babylonjs";

const ARViewer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Get the model URL from the query parameters
    const modelUrl = new URLSearchParams(window.location.search).get("modelUrl");
    console.log("Model URL: ", modelUrl); // Log the model URL

    if (modelUrl) {
      const engine = new Engine(canvasRef.current, true);
      const scene = new Scene(engine);

      // Create light and camera for the scene
      new HemisphericLight("light", new Vector3(1, 1, 0), scene);
      const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 4, Vector3.Zero(), scene);
      camera.attachControl(canvasRef.current, true);

      // Load the 3D model
      SceneLoader.Append("", modelUrl, scene, () => {
        engine.runRenderLoop(() => scene.render());
      }, null, (scene, message) => {
        console.error("Error loading model:", message);
      });

      return () => engine.dispose();
    } else {
      console.error("Model URL is not provided!");
    }
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
};

export default ARViewer;
