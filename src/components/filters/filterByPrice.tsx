import { ChevronDown } from "lucide-react";
export default function PriceByFilter() {
    return (
        <div className="hidden lg:block">
            <div className="w-full flex gap-12">
                <p className=" capitalize font-semibold">price</p>
                <div>
                    <ChevronDown />
                </div>
            </div>
        </div>
    );
}
