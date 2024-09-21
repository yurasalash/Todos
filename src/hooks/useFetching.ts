import {useState} from "react";

export const useFetching = (callback: () => void) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);

    const fetch = async (...args) => {
        try {
            setLoading(true);
            await callback(...args);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return [fetch, loading, error];
}