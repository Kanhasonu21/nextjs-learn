import { NextResponse } from "next/server";
import Users from '../../models/users';
import connectMongoDV from "@/app/libs/mongoose";
import { registerSchema } from "@/app/server/validator/register";
import bcrypt from 'bcrypt';

const SALT_ROUND = parseInt(process.env.SALT_ROUND) ?? 10;

export async function GET() {
    try {
        await connectMongoDV()
        const data = await Users.find({}, {
        });
        return NextResponse.json({ message: "Data Fetched!", data: data }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ msg: 'Data Not Inserted' }, { status: 500 })
    }
}

export async function POST(request) {
    try {

        const req = await request.json();

        const validate = registerSchema.safeParse(req)
        if (!validate.success) {
            const { errors } = validate.error;

            return NextResponse.json({ message: "Invalid request", errors }, { status: 400 })

        }
        const { email, password } = req;
        const hashPassword = bcrypt.hashSync(password, SALT_ROUND)
        const dataObj = {
            email,
            password: hashPassword
        }
        try {
            await connectMongoDV()
            const data = await Users.create(dataObj);
            return NextResponse.json({ message: "Account Created Successfully!", id: data._id }, { status: 201 })

        } catch (error) {
            const { code = 0 } = error
            if (code === 11000) {
                return NextResponse.json({ message: 'This email is already in use.' }, { status: 500 })

            }
            return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })

        }
    } catch (error) {
        return NextResponse.json({ message: 'Data Not Inserted' }, { status: 500 })
    }
}