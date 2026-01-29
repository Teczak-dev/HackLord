import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { AccountProvider } from './context/AccountProvider';
import { AppsProvider } from './context/AppsProvider';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
	<BrowserRouter>
	    <AccountProvider>
		<AppsProvider>
		    <AppRoutes/>
		</AppsProvider>
	    </AccountProvider>
	</BrowserRouter>
    </StrictMode>,
)
