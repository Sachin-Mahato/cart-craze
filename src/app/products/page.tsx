import SortByOptions from "@/components/filters/SortByOptions";
import PriceFilter from "@/components/filters/filterByPrice";
import ShowProduct from "./ShowProduct";

function Products() {
    return (
        <section className="lg:mb-8 lg:mx-40">
            <div className=" lg:grid lg:grid-cols-10-90 lg:gap-8">
                <div className=" lg:w-64 lg:flex lg:flex-col lg:gap-8">
                    <PriceFilter />
                </div>
                <div>
                    <div className=" lg:flex justify-end items-center">
                        <SortByOptions />
                    </div>
                    <ShowProduct />
                </div>
            </div>
        </section>
    );
}

export default Products;
