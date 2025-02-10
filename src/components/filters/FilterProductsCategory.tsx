"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CATEGORIES = [
    "All",
    "Electronics",
    "Jewelry",
    "Men's Clothing",
    "Women's Clothing",
] as const;

interface FilterProductsCategoryProps {
    onCategorySelect?: (category: string) => void;
    selectedCategory?: string;
}

export default function FilterProductsCategory({
    onCategorySelect,
    selectedCategory = "All",
}: FilterProductsCategoryProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCategory = () => setIsOpen((prev) => !prev);

    return (
        <div className="hidden lg:w-full lg:flex lg:flex-col lg:gap-4">
            <button
                className="lg:flex lg:gap-4 items-center"
                onClick={toggleCategory}
                aria-expanded={isOpen}
                aria-controls="category-list"
            >
                <p className="capitalize font-semibold">category</p>
                <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <section 
                    id="category-list"
                    className="mt-2"
                    role="listbox"
                    aria-label="Product categories"
                >
                    <div className="grid sm:grid-cols-5 gap-4">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                className={`text-left hover:bg-gray-100 p-2 rounded-md transition-colors
                                    ${selectedCategory === category ? 'bg-gray-100' : ''}`}
                                onClick={() => onCategorySelect?.(category)}
                                role="option"
                                aria-selected={selectedCategory === category}
                            >
                                <p className="text-sm font-semibold text-gray-800">
                                    {category}
                                </p>
                            </button>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
