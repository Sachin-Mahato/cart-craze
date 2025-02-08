"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterProductsCategory() {
    const [cateToggle, setCatToggle] = useState(false);

    function cateToggleClickHandler() {
        setCatToggle((prev) => !prev);
    }

    return (
        <div className="hidden lg:w-full lg:flex lg:flex-col lg:gap-4">
            <div className="lg:flex lg:gap-4">
                <p className="capitalize font-semibold">category</p>
                <div
                    className="cursor-pointer"
                    onClick={cateToggleClickHandler}
                >
                    <ChevronDown />
                </div>
            </div>
            {cateToggle && (
                <section className="">
                    <div className="grid sm:grid-cols-5 gap-4">
                        {/* All Category */}
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-semibold text-gray-800">
                                All
                            </p>
                        </div>

                        {/* Electronics Category */}
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-semibold text-gray-800">
                                Electronics
                            </p>
                        </div>

                        {/* Jewelry Category */}
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-semibold text-gray-800">
                                Jewelry
                            </p>
                        </div>

                        {/* Men's Clothing Category */}
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-semibold text-gray-800">
                                Men&apos;s Clothing
                            </p>
                        </div>

                        {/* Women's Clothing Category */}
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-semibold text-gray-800">
                                Women&apos;s Clothing
                            </p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
