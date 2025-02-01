"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useProductsContext } from "@/context/ProductsContext";
export default function PriceByFilter() {
    const { queryProducts, setQuery } = useProductsContext();
    const selectHandler = (val: string) => {
        setQuery(() => queryProducts(val));
    };

    return (
        <Select onValueChange={selectHandler}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="By price" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="5-50">$5 to $50</SelectItem>
                <SelectItem value="51-100">$50 to $100</SelectItem>
                <SelectItem value="101-200">$100 to $200</SelectItem>
                <SelectItem value="201">more than $200</SelectItem>
                <SelectItem value="products">All products</SelectItem>
            </SelectContent>
        </Select>
    );
}

// <div className="hidden lg:block">
//     <div className="w-full">
//         <p className=" capitalize font-semibold">price</p>
//         <div>
//             <Checkbox id="price" />
//             <label
//                 htmlFor="price"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//             >
//                 {`$5 to $30`}
//             </label>
//         </div>
//     </div>
// </div>
