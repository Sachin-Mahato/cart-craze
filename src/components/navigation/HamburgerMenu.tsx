"use client";
import CartLink from "./CartLink";
import ProductsLinks from "./ProductsLink";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import WishlistLink from "./WishlistLink";

export default function HamburgerMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    function handleToggle() {
        setIsMenuOpen((prev) => !prev);
    }
    return (
        <div className="relative ">
            <Button
                type="button"
                className="absolute right-4 z-50 "
                onClick={handleToggle}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle menu"
            >
                <Menu />
            </Button>
            <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-hidden={!isMenuOpen}
                className={`fixed top-0 right-0 h-full w-[60vw] bg-[#181313] transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full "
                }`}
            >
                <div className=" flex flex-col justify-center items-center gap-4 text-xl p-4 mt-20 text-white font-semibold z-50">
                    <CartLink />
                    <ProductsLinks />
                    <WishlistLink />
                </div>
            </div>
        </div>
    );
}
