import { createContext, useState, type ReactNode } from "react";
import type { Account } from "../shared/types/account";

interface AccountContextType {
    account: Account | null;
    updateAccount: (account: Account | null) => void;
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({children}:{children:ReactNode}) => {
    const [account, setAccount] = useState<Account | null>(null);

    const updateAccount = (account: Account | null) => {
	setAccount(account);
    }


    return(
	<AccountContext.Provider value={{account, updateAccount}}>
	    {children}
	</AccountContext.Provider>
    );
}
