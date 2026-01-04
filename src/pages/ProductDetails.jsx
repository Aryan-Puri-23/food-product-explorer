import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductByBarcode } from "../services/api";
import { useNavigate } from "react-router-dom";


export default function ProductDetails() {
    const { barcode } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        setNotFound(false);

        getProductByBarcode(barcode).then((data) => {
            if (!data) {
                setNotFound(true);
                setProduct(null);
            } else {
                setProduct(data);
            }
            setLoading(false);
        });
    }, [barcode]);

    useEffect(() => {
        if (notFound) {
            const timer = setTimeout(() => {
                navigate(-1);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notFound, navigate]);

    if (loading) {
        return <p className="p-4">Searching product...</p>;
    }

    if (notFound) {
        return (
            <div className="mt-8">
            <p className="text-center p-4 text-red-500">
                No product found for this barcode
            </p>
            <p className="text-center p-4 text-red-500">
                Redirecting back automatically…
            </p>
            </div>
            
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-12 sm:px-12 md:px-16 lg:px-18 py-8 mt-8">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                <div className="flex flex-col md:flex-row">

                    <div className="md:w-1/2 bg-gray-100 flex items-center justify-center max-h-[420px]">
                        <img
                            src={product.image_url || "/placeholder.png"}
                            alt={product.product_name}
                            className="w-full max-h-[420px] object-contain"
                        />

                    </div>

                    <div className="md:w-1/2 p-6 flex flex-col gap-4">

                        <h1 className="text-xl sm:text-2xl font-bold">
                            {product.product_name || "Unnamed Product"}
                        </h1>

                        <div className="flex flex-wrap gap-2">
                            {product.categories
                                ?.split(",")
                                .slice(0, 4)
                                .map((cat, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                                    >
                                        {cat.trim()}
                                    </span>
                                ))}
                        </div>

                        <span
                            className={`w-fit text-xs font-semibold px-3 py-1 rounded-full
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
                            Nutrition Grade: {product.nutrition_grades?.toUpperCase() || "N/A"}
                        </span>

                        <p className="text-sm text-gray-600">
                            <strong>Labels:</strong> {product.labels || "N/A"}
                        </p>
                    </div>
                </div>

                <div className="p-6 border-t flex flex-col gap-6">

                    <div>
                        <h2 className="font-semibold text-lg mb-2">Ingredients</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {product.ingredients_text || "Not available"}
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg mb-3">Nutrition Information</h2>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                            <div className="bg-gray-50 p-3 rounded-lg text-center">
                                <p className="font-semibold">Energy</p>
                                <p>{product.nutriments?.energy || "N/A"}</p>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg text-center">
                                <p className="font-semibold">Fat</p>
                                <p>{product.nutriments?.fat || "N/A"}</p>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg text-center">
                                <p className="font-semibold">Carbs</p>
                                <p>{product.nutriments?.carbohydrates || "N/A"}</p>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg text-center">
                                <p className="font-semibold">Protein</p>
                                <p>{product.nutriments?.proteins || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {notFound && (
                <div className="p-6 text-center">
                    <p className="text-red-500 font-medium">
                        No product found for this barcode
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        Redirecting back automatically…
                    </p>
                </div>
            )}

        </div>
    );

}