import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.jpg';
import { useAccount } from '../shared/hooks/useAccount';
import { useEffect } from 'react';
import Dock from '../components/dock/Dock';
import WindowManager from '../components/WindowManager';
import { useApps } from '../shared/hooks/useApps';
import { getAppById } from '../components/apps/AppRegistry';
import MenuBar from '../components/menu bar/MenuBar';

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
	<div style={{
	    backgroundImage: `url(${bg})`, 
	    height: '100vh', 
	    width: '100vw', 
	    backgroundSize: 'cover',
	    overflow: 'hidden',
	    position: 'relative'
	}}>
	    <MenuBar />
	    <WindowManager />
	    <Dock startUpApp={startUpApp}/>
	    <div style={{padding: '40px 20px'}}>
		Desktop
	    </div>
	</div>
    );
}

export default Desktop;
