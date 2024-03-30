
import connectMongoDV from '@/app/libs/mongoose';
import Todo from '../../models/todo';
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        connectMongoDV()
        const data = await Todo.find({}, {
            isCompleted: 1,
            taskName: 1
        });
        return NextResponse.json({ message: "Data Fetched!", data: data }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ msg: 'Data Not Inserted' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const req = await request.json()
        console.log(req)
        const data = await Todo.create(req);
        return NextResponse.json({ message: "Data Inserted", id: data._id }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ msg: 'Data Not Inserted' }, { status: 500 })
    }
}

export async function PATCH(request) {
    try {
        const { searchParams } = new URL(request.url)
        const body = await request.json()
        const taskID = searchParams.get('id')
        console.log(body, taskID)
        const data = await Todo.findByIdAndUpdate(taskID, body);
        console.log(data)
        return NextResponse.json({ message: "Data Updated" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ msg: 'Data Not Updated' }, { status: 500 })
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url)
        const taskID = searchParams.get('id')
        await Todo.findByIdAndDelete(taskID);
        return NextResponse.json({ message: "Data Deleted" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ msg: 'Data Not Deleted', err: error }, { status: 500 })
    }
}