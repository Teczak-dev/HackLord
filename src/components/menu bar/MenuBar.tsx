import { useEffect, useState } from 'react';
import style from './MenuBar.module.css';

const MenuBar = () => {

    const [time, setTime] = useState<string>('');

    useEffect(() => {
	const updateTime = () => {
	    const now = new Date();
	    const hours = now.getHours();
	    const minutes = now.getMinutes();
	    const ampm = hours >= 12 ? 'PM' : 'AM';
	    const formattedHours = hours % 12 || 12;
	    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	    setTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
	};

	updateTime();
	const intervalId = setInterval(updateTime, 60000); // Aktualizuj co minutę

	return () => clearInterval(intervalId);
    }, []);
    

    return (
	<div className={style.menuBar}>
	    <div className={style.leftSection}>
		<span className={style.menuItem}>Os</span>
		<span className={style.menuItem}>Plik</span>
		<span className={style.menuItem}>Edycja</span>
		<span className={style.menuItem}>Widok</span>
		<span className={style.menuItem}>Okno</span>
		<span className={style.menuItem}>Pomoc</span>
	    </div>
	    <div className={style.centerSection}>
		<span>HackLord Os 0.1</span>		    
	    </div>
	    <div className={style.rightSection}>
		<span className={`${style.menuItem} ${style.time}`}>{time}</span>
		<span className={style.menuItem}>szukaj</span>
		<span className={style.menuItem}>powiadomienia</span>
		<span className={style.menuItem}>ustawienia</span>
	    </div>
	</div>
    );
}

export default MenuBar;
