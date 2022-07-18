import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.min.css'
import './index.css'
import App from './App'
import {Toaster} from "react-hot-toast";

ReactDOM.render(
    <React.StrictMode>
    <>
        <Toaster position="top-center"/>
        <App />
    </>
    </React.StrictMode>,
    document.getElementById('root')
)
