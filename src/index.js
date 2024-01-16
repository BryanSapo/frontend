import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Nav from './Nav';
import { Route, Routes,BrowserRouter} from "react-router-dom"
import ControlPanel from './ControlPanel';
import FileUploader from './FileUploader';
import Home from './Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
const u ="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+ window.location.origin
// console.log(u)
root.render(
  	<React.StrictMode>
		<Nav />
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/Management' element={<ControlPanel/>} />
				<Route path='/qrcode' element={<img className={"qrcode"} src={u}/>}/>
				<Route path='/fileupload' element={<FileUploader/>}/>
				<Route path='/home' element={<Home/>}/>
			</Routes>
		
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
