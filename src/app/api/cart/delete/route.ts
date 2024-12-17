import { NextRequest, NextResponse } from "next/server";
import { dbConfig } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";
import mongoose from "mongoose";
dbConfig();

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // console.log("Request URL:", req.url);
    // console.log("Extracted ID:", id);
    // console.log("Extracted ID Type:", typeof id);

    if (!id) {
      return NextResponse.json({ message: "ID not found" }, { status: 400 });
    }

    const deleteItem = await Cart.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    // console.log("Delete Result:", deleteItem);

    if (deleteItem.deletedCount === 0) {
      return NextResponse.json(
        { message: "Item not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "delete successfully",
      success: true,
    });
  } catch (error) {
    console.log(`error in delete: ${error}`);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

// export async function DELETE(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");
//     if (!id) {
//       console.log(`id not found during delete:${id}`);
//       return NextResponse.json({ message: "ID not found" }, { status: 400 });
//     }
//     const deleteItem = await Cart.deleteOne({
//       _id: new mongoose.Types.ObjectId(id),
//     });

//     if (deleteItem.deletedCount === 0) {
//       return NextResponse.json(
//         {
//           message: "already deleted",
//         },
//         { status: 400 }
//       );
//     }
//     return NextResponse.json({
//       message: "successfully delete the item ",
//       success: true,
//     });
//   } catch (error) {
//     console.log(`error in delete ${error}`);
//   }
// }
