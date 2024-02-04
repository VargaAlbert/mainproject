import { useShopContext } from '@/services/providers/ShopContext';
import axios from '@/services/api/axiosConfig';
import { initAuth } from '@/services/initConfig';

const useLogout = () => {
    const { setAuth } = useShopContext();

    const logout = async () => {
        setAuth(initAuth);
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout 