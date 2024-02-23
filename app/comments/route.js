import { comments } from "./data"

export async function GET() {
    return Response.json(comments)
}

export async function POST(request) {
    const res = await request.json()
    const newComments = {
        id:comments.length+1,
        body:res.data
    }
    comments.push(newComments)
    return Response.json(comments)
}