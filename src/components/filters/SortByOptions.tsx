"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useProductsContext } from "@/context/ProductsContext";

export default function SortByOptions() {
    const { sortProducts } = useProductsContext();

    return (
        <Select onValueChange={sortProducts}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="By rating" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="high-to-low">High to low</SelectItem>
                <SelectItem value="low-to-high">Low to high</SelectItem>
            </SelectContent>
        </Select>
    );
}
