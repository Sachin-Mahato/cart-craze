"use client";
import CartLink from "./CartLink";
import ProductsLinks from "./ProductsLink";

function HamburgerMenu() {
  return (
    <div className="relative ">
      <button type="button" className="absolute right-4 z-50">
        <HamburgerIcon />
      </button>
      <div>
        <div className=" flex flex-col justify-center items-center gap-4 text-xl p-4 mt-20 text-white font-semibold z-50">
          <CartLink />
          {/* <WishlistLink /> */}
          <ProductsLinks />
        </div>
      </div>
    </div>
  );
}

function HamburgerIcon() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`size-8 $`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
}

export default HamburgerMenu;
