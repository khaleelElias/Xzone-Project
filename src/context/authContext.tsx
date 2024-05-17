import { ReactNode, createContext, useState } from "react";
import { POST } from "../helper/apiHelper";
import Modal from "../components/Modal/Modal";

type Props = {
    children?: ReactNode;
}

type IAuthContext = {
    authenticated: boolean;
    authenticate: () => void;
}

const initialValue: IAuthContext = {
    authenticated: false,
    authenticate: async () => { }
}

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
    const [authenticated, setAuthenticated] = useState<boolean>(initialValue.authenticated);
    const [registerOpen, setRegisterOpen] = useState<boolean>(false);
    const [walletAddress, setWalletAddress] = useState("");
    const getProvider = () => {
        if ('phantom' in window) {
            const phantom = window.phantom as any;

            const provider = phantom?.solana;
            if (provider?.isPhantom) {
                return provider;
            }
        }

        window.open('https://phantom.app/', '_blank');
    };

    const authenticate = async () => {
        let provider = getProvider();
        if (!provider)
            return;

        try {
            const resp = await provider.connect({ onlyIfTrusted: true });
            setWalletAddress(resp.publicKey.toString());

            const response = await POST("/auth/user/login", {
                signature: resp.publicKey.toString(),
                walletAddress: resp.publicKey.toString()
            });

            if(response.successful) {

            } else {
                if(response.status == 404) {
                    setRegisterOpen(true);
                } else {
                    //TODO: warn user?
                    console.log(response.message);
                }
            }

            // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 

        } catch (err) {
            // { code: 4001, message: 'User rejected the request.' }
        }
    }

    const register = async () => {
        
        const response = await POST("/auth/user/register", {
            walletAddress: walletAddress
        });

        if(!response.successful) {
            //TODO: warn user?
            console.log("error")
        } else {
            setRegisterOpen(false);
            authenticate();
        }
    }

    return (
        <AuthContext.Provider value={{ authenticated, authenticate }}>
            <Modal open={false} title={"Terms of servie"}>
                <p>brororororooooooor du måste acceptera detta</p>
                <button onClick={register}>I Accept</button>
                <button onClick={() => setRegisterOpen(false) }>I Decline</button>
            </Modal>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }