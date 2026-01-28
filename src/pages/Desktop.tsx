import bg from '../assets/bg.jpg';

const Desktop = () => {
    
    return (
	<div style={{backgroundImage: `url(${bg})`, height: '100svh', width: '100svw', backgroundSize: 'cover'}}>
	    <h1>Desktop Environment</h1>
	</div>
    );
}

export default Desktop;
