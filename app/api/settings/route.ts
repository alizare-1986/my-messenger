import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
export async function POST(request:Request){
    try {
        const currentUser=await getCurrentUser()
        const body =await request.json()
        const {image,name}=body 
        if(!currentUser?.id){
            return new NextResponse("UN authorized ID" ,{status:401})
        }
        const updatedUser=await prisma.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                image:image,
                name:name
            }
        })
        return NextResponse.json(updatedUser)
    } catch (error:any) {
        console.log(error,"ERROR_SETTINGS");
        return new NextResponse("Internal ERROR",{status:500})
        
        
    }
}