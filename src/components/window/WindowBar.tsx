import styles from './WindowBar.module.css';

const WindowBar = (
    {className, 
    closeWindow,
    fullscreenWindow, 
    windowTitle}:
    {className:string, 
    closeWindow: () => void, 
    fullscreenWindow: () => void, 
    windowTitle:string}) => {
    return(
	<div className={`${styles.bar} ${className}`} style={{ background: '#ccc', color: '#111', cursor: 'move' }}>
	    <div className={styles.controls}>
		<button className={styles.close} onClick={closeWindow}>
		    Zamknij
		</button>
		<button className={styles.minimize}>
		    zminimalizuj
		</button>
		<button className={styles.maximize} onClick={fullscreenWindow}>
		    pełen ekran
		</button>
	    </div>
	    <div className={styles.title}>
		{windowTitle}
	    </div>
	</div>
    );
}

export default WindowBar;
