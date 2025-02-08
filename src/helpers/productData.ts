"use strict";
import axios from "axios";

const cache = new Map();

export default async function getData(url: string) {
    if (cache.has(url)) {
        return cache.get(url);
    }
    try {
        const response = await axios.get(url);
        const data = await response.data?.productsData;
        if (!data) {
            return null;
        }
        cache.set(url, data);
        return data;
    } catch (err) {
        if (axios.isCancel(err)) {
            console.warn("Request canceled:", err.message);
        }
        console.error("Error in API call:", err);
        return null; // Ensure a return value even on failure
    }
}

export function debounce(fn: () => void, delay: number) {
    let id: ReturnType<typeof setTimeout> | undefined;

    return () => {
        if (id) {
            clearTimeout(id);
        }
        id = setTimeout(() => {
            fn();
        }, delay);
    };
}
