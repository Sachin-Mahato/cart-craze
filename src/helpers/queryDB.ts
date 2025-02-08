"use strict";

import endPoints from "@/app/endPoints";
import axios from "axios";

const cache = new Map();

export default async function queryDB(min: number, max: number) {
    const url = endPoints.products.query(min, max);

    if (cache.has(url)) {
        return cache.get(url);
    }

    try {
        const response = await axios.get(url);
        const data = await response?.data;
        if (!data) {
            console.error("No data query from DB");
            return null;
        }
        cache.set(url, data);
        return data;
    } catch (error) {
        console.log(
            "Error in querying DB",
            error instanceof Error ? error.message : error
        );
    }
}
