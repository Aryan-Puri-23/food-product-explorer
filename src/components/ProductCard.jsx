import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <Link to={`/product/${product.code}`} className="group block">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

                <div className="h-44 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                        src={product.image_url || "/placeholder.png"}
                        alt={product.product_name || "Product image"}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="p-4 flex flex-col gap-2">

                    <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
                        {product.product_name || "No Name Available"}
                    </h3>


                    <div className="mt-1 flex flex-wrap gap-2">
                        {product.categories
                            ?.split(",")
                            .slice(0, 3)
                            .map((cat, index) => (
                                <p
                                    key={index}
                                    className="w-fit text-xs sm:text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                                >
                                    {cat.trim()}
                                </p>
                            )) || (
                                <p className="text-xs text-gray-400">No categories</p>
                            )}
                    </div>


                    <span
                        className={`w-fit mt-2 text-xs font-semibold px-2 py-1 rounded-full inline-block
                        ${product.nutrition_grades === "a"
                                ? "bg-green-100 text-green-700"
                                : product.nutrition_grades === "b"
                                    ? "bg-lime-100 text-lime-700"
                                    : product.nutrition_grades === "c"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : product.nutrition_grades === "d"
                                            ? "bg-orange-100 text-orange-700"
                                            : "bg-red-100 text-red-700"
                            }
                        `}
                    >
                        Grade: {product.nutrition_grades?.toUpperCase() || "N/A"}
                    </span>

                </div>
            </div>
        </Link>
    );
}