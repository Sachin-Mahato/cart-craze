import Link from "next/link";
import { Logo } from "@/components/icons/index";
import HamburgerMenu from "./HamburgerMenu";
import Searchbar from "./Searchbar";
import Contact from "@/components/Footer/Contact";
import { ShoppingCart, Heart } from "lucide-react";
import UserButton from "../buttons/UserButton";

export default function Navbar() {
    return (
        <nav className="my-7">
            <div className="lg:hidden flex justify-between ">
                <Logo />
                <HamburgerMenu />
            </div>
            <div className="hidden lg:grid lg:grid-cols-2 lg:mx-40 lg:gap-8">
                <div className="flex items-center gap-4 justify-center">
                    <Logo />
                    <Searchbar />
                </div>

                <div className="flex items-center justify-between">
                    <Link href={"/"}>Home</Link>
                    <Link href="/products">Products</Link>
                    <Contact />
                    <Link href={"/wishlist"}>
                        <Heart />
                    </Link>
                    <Link href={"/cart"}>
                        <ShoppingCart />
                    </Link>

                    <UserButton />
                </div>
            </div>
        </nav>
    );
}

