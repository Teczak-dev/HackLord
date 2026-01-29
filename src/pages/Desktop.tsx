import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.jpg';
import { useAccount } from '../shared/hooks/useAccount';
import { useEffect } from 'react';
import Dock from '../components/dock/Dock';
import WindowManager from '../components/WindowManager';
import { useApps } from '../shared/hooks/useApps';
import { getAppById } from '../components/apps/AppRegistry';

const Desktop = () => {
    
    const { account } = useAccount();
    const { openApp } = useApps();
    const navigate = useNavigate();
    
    useEffect(() => {
	if (account === null) navigate('/login');
    }, [account, navigate]);
    
    const startUpApp = (id: number) => {
        const app = getAppById(id);
        if (app) {
            openApp(app);
        } else {
            console.log(`App with id ${id} not found`);
        }
    }

    return (
	<div style={{backgroundImage: `url(${bg})`, height: '100svh', width: '100svw', backgroundSize: 'cover'}}>
	    <h1>Desktop Environment, Hello {account?.name}</h1>
	    <Dock startUpApp={startUpApp}/>
	    <WindowManager />
	</div>
    );
}

export default Desktop;
