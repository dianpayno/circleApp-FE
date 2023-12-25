import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import ThreadsProvider from './services/ThreadsContex.tsx'
import { Provider } from 'react-redux'
import {store} from './store/store.ts'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <ThreadsProvider>
    <ChakraProvider>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
    </ThreadsProvider>
    </QueryClientProvider>
      </Provider>
  </React.StrictMode>
);
