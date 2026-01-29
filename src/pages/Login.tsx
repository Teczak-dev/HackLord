import { useNavigate } from "react-router-dom";
import accounts from "../../data/accounts";
import styles from "../styles/Login.module.css";
import { useAccount } from "../shared/hooks/useAccount";

const Login = () => {
    const { updateAccount } = useAccount();
    const navigate = useNavigate();

    const loginUser = (accountId: number) => {
	updateAccount(accounts.find(acc => acc.id === accountId) || null);
	navigate('/desktop');
    }

    return(
	<div className={styles.loginContainer}>
	    <div className={styles.loginBox}>
		<h1 className={styles.header}>Wybierz użytkownika</h1>
		<div className={styles.accountsContainer}>
		    {accounts.map((account) => (
		    <div key={account.id} className={styles.accountCard}>
			<img src={account.profile_pic}  className={styles.accountImg}/>
			<p className={styles.accountName}>{account.name}</p>
			<button className={styles.loginBtn} onClick={() => loginUser(account.id)}>Zaloguj się</button>
		    </div>
		    ))}
		    <div className={`${styles.accountCard} ${styles.createAccountCard}`}>
			<button className={styles.createAccountBtn} onClick={() => navigate('/create-account')}>Utwórz nowe konto</button>
		    </div>
		</div>
	    </div>
	</div>
    );
}

export default Login;
