import { useEffect, useState } from "react";
import {
    fetchProducts,
    searchProducts,
    getProductByBarcode,
    fetchCategories,
} from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortProducts from "../components/SortProducts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [sort, setSort] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [autoReset, setAutoReset] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        if (page === 1) return;

        if (activeCategory) {
            axios
                .get("https://world.openfoodfacts.org/api/v2/search", {
                    params: {
                        categories_tags: activeCategory,
                        page,
                        page_size: 20,
                        fields:
                            "code,product_name,image_url,categories,ingredients_text,nutrition_grades",
                    },
                })
                .then((res) => {
                    setProducts((prev) =>
                        uniqueByCode([...prev, ...res.data.products])
                    );
                });
        } else if (!isSearching) {
            loadProducts();
        }
    }, [page, activeCategory, isSearching]);


    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    useEffect(() => {
        if (search.trim() === "") {
            setIsSearching(false);
            setPage(1);
            setLoading(true);
            fetchProducts(1).then((data) => {
                setProducts(data);
                setLoading(false);
            });
        }
    }, [search]);


    const uniqueByCode = (items) => {
        const map = new Map();
        items.forEach((item) => {
            if (item?.code) {
                map.set(item.code, item);
            }
        });
        return Array.from(map.values());
    };

    const loadProducts = async () => {
        setLoading(true);
        const data = await fetchProducts(page);
        setProducts((prev) => uniqueByCode([...prev, ...data]));
        setLoading(false);
    };


    const handleSearch = async () => {
        setPage(1);

        const normalizedSearch = search.trim().toLowerCase();

        if (/^\d+$/.test(normalizedSearch)) {
            navigate(`/product/${normalizedSearch}`);
            return;
        }

        setIsSearching(true);
        setLoading(true);

        const data = await searchProducts(normalizedSearch, 1);

        const filtered = data.filter((p) =>
            p.product_name?.toLowerCase().includes(normalizedSearch)
        );

        setProducts(filtered);
        setLoading(false);

        if (filtered.length === 0) {
            setAutoReset(true);

            setTimeout(async () => {
                setSearch("");
                setIsSearching(false);
                setPage(1);

                setLoading(true);
                const original = await fetchProducts(1);
                setProducts(original);
                setLoading(false);

                setAutoReset(false);
            }, 3000);
        }

    };


    const handleCategory = async (cat) => {
        if (!cat) {
            setActiveCategory(null);
            setIsSearching(false);
            setPage(1);

            setLoading(true);
            const data = await fetchProducts(1);
            setProducts(data);
            setLoading(false);
            return;
        }

        setIsSearching(true);
        setActiveCategory(cat);
        setPage(1);

        const res = await axios.get(
            "https://world.openfoodfacts.org/api/v2/search",
            {
                params: {
                    categories_tags: cat,
                    page: 1,
                    page_size: 20,
                    fields:
                        "code,product_name,image_url,categories,ingredients_text,nutrition_grades",
                },
            }
        );

        setProducts(res.data.products);
    };


    const sortedProducts = [...uniqueByCode(products)].sort((a, b) => {
        if (sort === "name-asc")
            return (a.product_name || "").localeCompare(b.product_name || "");
        if (sort === "name-desc")
            return (b.product_name || "").localeCompare(a.product_name || "");
        if (sort === "grade-asc")
            return (a.nutrition_grades || "").localeCompare(
                b.nutrition_grades || ""
            );
        if (sort === "grade-desc")
            return (b.nutrition_grades || "").localeCompare(
                a.nutrition_grades || ""
            );
        return 0;
    });


    return (
        <div className="p-6">
            <div className="p-4 flex flex-col gap-8 md:gap-0 md:flex-row md:justify-between mt-4 sm:mb-8 md:mb-8 mx-4 sm:mx-4 md:mx-16">

                <div className="w-full sm:w-3/4 md:w-1/2 md:mx-0 mx-auto">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        onSearch={handleSearch}
                    />
                </div>

                <div className="flex flex-row gap-12 sm:gap-12 md:mx-0 w-full sm:w-3/4 md:w-1/2 mx-auto md:gap-8">
                    <CategoryFilter
                        categories={categories}
                        onChange={handleCategory}
                    />
                    <SortProducts onChange={setSort} />
                </div>

            </div>

            {loading && (
                <p className="text-center text-gray-500">Loading products...</p>
            )}


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-12 sm:p-4 p-12">
                {sortedProducts.map((p, i) => (
                    <ProductCard key={p.code} product={p} />
                ))}
            </div>

            {isSearching && sortedProducts.length === 0 && (
                <div className="text-center col-span-full">
                    <p className="text-red-500 font-medium">
                        No products found for "{search}"
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Showing all products again…
                    </p>
                </div>
            )}


            {(!isSearching || activeCategory) && (
                <button
                    onClick={() => setPage(page + 1)}
                    className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                    Load More
                </button>
            )}

        </div>
    );
}