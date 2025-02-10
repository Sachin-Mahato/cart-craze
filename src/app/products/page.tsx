import SortByOptions from "@/components/filters/SortByOptions";
import PriceFilter from "@/components/filters/FilterByPrice";
import ShowProduct from "./ShowProduct";

function Products() {
    return (
        <section className="lg:mb-8 lg:mx-40">
            <div className=" lg:grid lg:grid-rows-10-90 lg:gap-8">
                {/* <div className=" lg:w-64 lg:flex lg:flex-col lg:gap-8"> */}
                {/* </div> */}
                <div>
                    <div className=" lg:flex justify-between items-center lg:mx-24">
                        <PriceFilter />
                        <SortByOptions />
                    </div>
                    <ShowProduct />
                </div>
            </div>
        </section>
    );
}

export default Products;
