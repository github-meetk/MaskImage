import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import "./App.css";

const App = () => {
  const [image, setImage] = useState(null);
  const [brushSize, setBrushSize] = useState(10);
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const exportMask = () => {
    const maskCanvas = canvasRef.current.canvasContainer.children[1];
    const maskContext = maskCanvas.getContext("2d");
    maskContext.globalCompositeOperation = "destination-over";
    maskContext.fillStyle = "black";
    maskContext.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

    const maskURL = maskCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "mask.png";
    link.href = maskURL;
    link.click();
  };

  const clearCanvas = () => {
    canvasRef.current.clear();
  };

  const handleBrushSizeChange = (event) => {
    setBrushSize(event.target.value);
  };

  return (
    <div className="App">
      <h1>Image Inpainting Widget</h1>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {image && (
        <div
          className="canvas-container"
          style={{
            position: "relative",
            width: "500px",
            height: "500px",
            display: "inline-block",
          }}
        >
          <CanvasDraw
            ref={canvasRef}
            brushColor="white"
            brushRadius={brushSize}
            canvasWidth={500}
            canvasHeight={500}
            lazyRadius={0}
            hideGrid={true}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
            imgSrc={image}
          />
        </div>
      )}

      {image && (
        <div>
          <div className="brush-size">
            <label htmlFor="brushSize">Brush Size: {brushSize}</label>
            <input
              type="range"
              id="brushSize"
              min="1"
              max="50"
              value={brushSize}
              onChange={handleBrushSizeChange}
              style={{ width: "200px" }}
            />
          </div>

          <button className="export-button" onClick={exportMask}>
            Export Mask
          </button>
          <button className="clear-button" onClick={clearCanvas}>
            Clear Canvas
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
