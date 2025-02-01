import axios from "axios";

const cache = new Map();
export async function getCartData(url: string) {
    if (cache.has(url)) {
        return cache.get(url);
    }
    try {
        const response = await axios.get(url);
        const data = response?.data;
        if (!data) {
            console.error("No data received from the API");
            return null;
        }
        cache.set(url, data);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error in fetching cart Data:", error.message);
        } else {
            console.error("Error in fetching cart data:", error);
        }
        return null;
    }
}
