import prisma from "@/config/prisma";
import bcrypt from "bcrypt";


interface RegisterInput {
    email: string,
    password: string
};


export const registerUserService = async (UserData: RegisterInput)=>{
    const existingUser = await prisma.user.findUnique({
        where : {email: UserData.email }
});


if(existingUser){

    throw new Error("EMAIL_EXISTS")

}

const hashedPassword = await bcrypt.hash(UserData.password, 11);
const newuser = await prisma.user.create({
    data: {
        email: UserData.email,
        password: hashedPassword
    }
});
return newuser;
};



