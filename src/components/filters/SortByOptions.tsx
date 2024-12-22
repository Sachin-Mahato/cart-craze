import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function SortByOptions() {
    return (
        <Select>
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

export default SortByOptions;

// <div className="flex justify-around py-2 rounded-md border-[#ebebeb] border-[1px] border-solid">
//     <p className="font-semibold ">By rating</p>

//     <select>
//         <option value="">please select </option>
//         <option className="capitalize" value="popularity">
//             popularity
//         </option>
//         <option className="capitalize" value="relevance">
//             relevance
//         </option>
//         <option className="capitalize" value="high-to-low">
//             high to low
//         </option>
//         <option className="capitalize" value="low-to-high">
//             low to high
//         </option>
//     </select>
// </div>
