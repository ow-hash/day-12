"use client";

import { useEffect, useState, use } from "react";

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    images: string[];
    thumbnail: string;
}

interface ResolvedProductParams {
    productId: number | string;
}

interface ProductDetailProps {
    params: Promise<ResolvedProductParams>;
}

const ProductID = ({ params }: ProductDetailProps) => {
    const resolvedParams = use(params);
    const { productId } = resolvedParams;

    const [products, setProducts] = useState<Product | null>(null);

    useEffect(() => {
        if (productId) {
            const fetchProducts = async () => {
                const response = await fetch(`https://dummyjson.com/products/${productId}`);
                const data = await response.json();
                setProducts(data);
            };
            fetchProducts();
        }
    }, [productId]);

    if (!products) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-2xl w-full">
                <img className="w-full h-64 object-cover" src={products.thumbnail} alt={products.title} />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-2">{products.title}</h1>
                    <p className="text-gray-700 text-sm mb-1">Brand: {products.brand}</p>
                    <p className="text-gray-700 text-sm mb-4">Category: {products.category}</p>
                    <p className="text-gray-800 mb-4">{products.description}</p>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-2xl font-semibold text-green-600">${products.price.toFixed(2)}</p>
                        {products.discountPercentage > 0 && (
                            <p className="text-sm text-red-500 line-through">
                                ${((products.price / (1 - products.discountPercentage / 100))).toFixed(2)}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-between items-center mb-4 text-sm">
                        <p className="text-yellow-500">Rating: {products.rating}/5</p>
                        <p className={products.stock > 0 ? "text-green-500" : "text-red-500"}>
                            {products.availabilityStatus} (Stock: {products.stock})
                        </p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Product Details</h2>
                        <ul className="list-disc list-inside text-gray-700 text-sm">
                            <li>SKU: {products.sku}</li>
                            <li>Weight: {products.weight}g</li>
                            <li>Dimensions: {products.dimensions.width} x {products.dimensions.height} x {products.dimensions.depth} cm</li>
                            <li>Warranty: {products.warrantyInformation}</li>
                            <li>Shipping: {products.shippingInformation}</li>
                        </ul>
                    </div>
                    {products.tags && products.tags.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-md font-semibold mb-1">Tags:</h3>
                            <div className="flex flex-wrap gap-2">
                                {products.tags.map(tag => (
                                    <span key={tag} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">{tag}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {products.images && products.images.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-md font-semibold mb-1">Images:</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {products.images.map((image, index) => (
                                    <img key={index} src={image} alt={`${products.title} image ${index + 1}`} className="rounded-md object-cover h-32 w-full" />
                                ))}
                            </div>
                        </div>
                    )}
                    {products.reviews && products.reviews.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Reviews</h2>
                            {products.reviews.slice(0, 3).map((review, index) => (
                                <div key={index} className="border-t border-gray-200 py-3">
                                    <p className="font-semibold">{review.reviewerName} <span className="text-yellow-500">({review.rating}/5)</span></p>
                                    <p className="text-gray-600 text-sm">{review.comment}</p>
                                    <p className="text-gray-400 text-xs">{new Date(review.date).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductID;