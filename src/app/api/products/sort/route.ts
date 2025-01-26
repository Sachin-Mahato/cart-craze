export async function GET() {
    try {
    } catch (error) {
        console.log("error in sorting elements", error);
        return Response.json(
            {
                success: false,
                message: "Not able to sort the elements",
            },
            {
                status: 500,
            }
        );
    }
}
