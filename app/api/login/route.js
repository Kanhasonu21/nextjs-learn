import { NextResponse } from "next/server";
import Users from '../../models/users';
import connectMongoDV from "../../libs/mongoose";
import { registerSchema } from "../../server/validator/register";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.NEXTAUTH_SECRET ?? ""


export async function POST(request) {
    try {

        const req = await request.json();

        const validate = registerSchema.safeParse(req)
        if (!validate.success) {
            const { errors } = validate.error;
            return NextResponse.json({ message: "Invalid request", errors }, { status: 400 })
        }
        const { email, password } = req;
        try {
            await connectMongoDV()
            const data = await Users.findOne({ email: email });
            if (!data) return NextResponse.json({ message: "Account Not Found!", }, { status: 404 })
            const { email: userEmail, password: userPassword } = data;
            let isPasswordSame = bcrypt.compareSync(password, userPassword)
            if (!isPasswordSame) return NextResponse.json({ message: "Password Mismatch!", }, { status: 400 })
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: userEmail
            }, SECRET_KEY);
            return NextResponse.json({
                message: "Login Successfull !", data: {
                    token: token
                }
            }, { status: 200 })

        } catch (error) {
            return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })

        }
    } catch (error) {
        return NextResponse.json({ message: 'Data Not Inserted' }, { status: 500 })
    }
}