import React from 'react';

const Blogs = async () => {
    try {
        const data = await fetch('https://dummyjson.com/posts');
        console.log("Response data:", data);
        if (!data.ok) {
            // Log more details if the HTTP response status is not OK
            console.error("Failed to fetch posts, status:", data.status);
            const errorText = await data.text();
            console.error("Error response text:", errorText);
            // You might want to throw an error here or return an error state
            // For now, let's return an empty array or a message
            return (
                <div>
                    <h1 className='text-3xl font-bold'>Blogs</h1>
                    <p>Failed to load posts. Please try again later.</p>
                </div>
            );
        }

        const res = await data.json();

        return (
            <div>
                <h1 className='text-3xl font-bold'>Blogs</h1>
                <div className='flex flex-col items-center justify-center min-h-screen py-2'>
                    {res.posts.map((post: any) => (
                        <div key={post.id} className='border p-4 m-2 w-full max-w-2xl'>
                            <h2 className='text-xl font-semibold'>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching posts:", error);
        // Render an error message or a fallback UI
        return (
            <div>
                <h1 className='text-3xl font-bold'>Blogs</h1>
                <p>An error occurred while fetching posts.</p>
                {/* Optionally display the error message, but be careful with exposing details in production */}
                {/* <p>Error: {error instanceof Error ? error.message : String(error)}</p> */}
            </div>
        );
    }
};

export default Blogs;