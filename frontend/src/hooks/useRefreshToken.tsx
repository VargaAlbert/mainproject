import axios from '@/services/api/axiosConfig';
import { useShopContext } from '@/services/providers/ShopContext';

const useRefreshToken = () => {
    const { setAuth } = useShopContext();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            /* console.log(response.data.accessToken); */
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;