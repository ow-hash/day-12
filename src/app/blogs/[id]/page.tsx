import React from 'react'



const page = async ({params} : {params : {id: string}}) => {
    
    const data = await fetch(`https://dummyjson.com/posts/${params.id}`);

    const res = await data.json();
    
    return (
        <div className='text-center'>
            <h1 className='text-3xl font-bold'>{res.title}</h1>
            <p className='mt-4'>{res.body}</p>        
        </div>
    )
}


export default page