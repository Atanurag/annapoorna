import React from 'react';
import { createRoot } from 'react-dom/client';
import Demo from './demo';
import {BrowserRouter} from "react-router-dom";
createRoot(document.getElementById('container')).render( 
<BrowserRouter> <Demo /></BrowserRouter>
);
  



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import {BrowserRouter} from "react-router-dom";
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
// <BrowserRouter>
//     <App />
// </BrowserRouter>
// );
