import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import cheese from "../images/download (3).jfif"

const Tem = () => {

   const getValue=(e)=>{
    console.log(e.getSaveData);
    // const canvasSave = document.getElementById('resetCanvas');
    // const d = canvasSave.toDataURL('image/png');
    // const w = window.open('about:blank', 'image from canvas');
    // w.document.write("<img src='"+d+"' alt='from canvas'/>");
    // console.log('Saved!'); 

   }
    
    return (
        <div>
              {/* <div>
        <canvas  width={640} height={425} /> 
        <img ref="image" src={cheese} className="hidden" />
      </div> */}

        <CanvasDraw onChange={getValue}  id="resetCanvas"/>
        </div>
    );
};

export default Tem;  
  Tem.defaultProps = {
    onChange: null,
    loadTimeOffset: 5,
    lazyRadius: 30,
    brushRadius: 12,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 800,
    canvasHeight: 400, 
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false,
    gridSizeX: 25,
    gridSizeY: 25,
    gridLineWidth: 0.5,
    hideGridX: false,
    hideGridY: false,
    enablePanAndZoom: false,
    mouseZoomFactor: 0.01,
    zoomExtents: { min: 0.33, max: 3 },
  }; 