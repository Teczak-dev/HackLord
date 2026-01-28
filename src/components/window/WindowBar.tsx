

const WindowBar = ({className, closeWindow, fullscreenWindow}:{className:string, closeWindow: () => void, fullscreenWindow: () => void}) => {
    return(
	<div className={className} style={{ background: '#ccc', color: '#111', cursor: 'move' }}>
	    <div>
		<button onClick={closeWindow}>
		    Zamknij
		</button>
		<button>
		    zminimalizuj
		</button>
		<button onClick={fullscreenWindow}>
		    pełen ekran
		</button>
	    </div>
	    <div>
		Tytuł okna
	    </div>
	</div>
    );
}

export default WindowBar;
