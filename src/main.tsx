import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.css'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query/queryClient';
import { store } from './store/store.ts';
import {Provider} from 'react-redux'
import AppRoutes from './routes.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
    <AppRoutes />
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
