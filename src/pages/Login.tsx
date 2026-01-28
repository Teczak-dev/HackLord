import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    return(
	<div>
	    <h1>Wybierz użytkownika</h1>
	    <div>
		<img/>
		<p>Admin</p>
		<button onClick={() => navigate('/desktop')}>Zaloguj się</button>
	    </div>
	</div>
    );
}

export default Login;
