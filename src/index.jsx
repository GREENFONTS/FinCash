import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react'
import Layout from './layout';
import Public from './public';
import NavComponent from './components/nav';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <ChakraProvider>
     <Provider store={store}>
    <BrowserRouter>
    <NavComponent />
    <Public />
    <Layout>
      <App/>
    </Layout>
    </BrowserRouter>

</Provider>
  </ChakraProvider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
