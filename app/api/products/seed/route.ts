import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import ProductModal from "@/lib/models/ProductModel";
import UserModal from "@/lib/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const {users, products} = data
    await dbConnect()
    await UserModal.deleteMany()
    await UserModal.insertMany(users)

    await ProductModal.deleteMany()
    await ProductModal.insertMany(products)

    return NextResponse.json({
        message: 'seeded successfully',
        users,
        products,
    })
}
