import prisma from "@/config/prisma";
import { generateToken, verifyToken } from "@/utils/jwt";
import bcrypt from "bcrypt";


interface RegisterInput {
    email: string,
    password: string
};


export const registerUserService = async (UserData: RegisterInput)=>{
    const existingUser = await prisma.user.findUnique({
        where : {email: UserData.email,},
        
});
if(existingUser){

    throw new Error("EMAIL_EXISTS")

}
const hashedPassword = await bcrypt.hash(UserData.password, 11);
const newUser = await prisma.user.create({
    data: {
        email: UserData.email,
        password: hashedPassword
    }
});
return newUser;
};


export const loginUserService = async(UserData: RegisterInput)=>{
      const existingUser = await prisma.user.findUnique({
        where : {email: UserData.email},
        select: { id: true, email: true, password: true, role: true }

});

if(!existingUser){
    throw new Error("NOT_FOUND")
};

const isPasswordValid = await bcrypt.compare( UserData.password, existingUser.password);


if(!isPasswordValid){
    throw new Error("INVALID_PASSWORD")
}

const newToken = generateToken ( existingUser.id, existingUser.email, existingUser.role)

return {email: existingUser.email,
    id: existingUser.id,
    token: newToken

};



}
