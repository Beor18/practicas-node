import React, { Component } from 'react';
import { Impress, Step } from 'react-impressjs';

//Estilo de react-impress
import 'react-impressjs/styles/react-impressjs.css';
import './App.css';


const defaultDesplacement = 1000;

const App = () => (
  <Impress
    progress={true}
    fallbackMessage={<p>Errorrr</p>}
  >
  <Step className="slide" id="impress">
   <div className="text-center"> 
     <h3>Presentación sobre TensorFlow JS</h3>
     <p className="autor"><strong>Por Fernando López 2018</strong></p>
   </div>
  </Step>

  <Step className="slide" data={{ x: defaultDesplacement}}>
  <div className="text-center"> 
     <h3>¿Que es TensorFlow?</h3>
   </div>
  </Step>

  <Step className="step" id="bored" data={{ x: -1000, y: -1500 }}>
  <div className="text-center-dos"> 
     <p>* Es una Biblioteca OpenSource</p>
     <p>* Redes Neuronales de aprendizaje profundo</p>
   </div>
  </Step>
  </Impress>
);

export default App;
