
export async function GET(request: Request) {
    return Response.json({
        message: "Hello World"
    })
}

export async function POST(request: Request) {
    const {name, email} = await request.json();
    return Response.json({
        message: `Hello ${name} with email ${email}`
    })
}
