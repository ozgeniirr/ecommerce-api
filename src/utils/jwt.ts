import jwt from "jsonwebtoken";

export const generateToken = (userId: number, email: string, role:string ): string => {
  return jwt.sign({ userId, email, role }, process.env.JWT_SECRET as string, {
    expiresIn: "7d", // burası kod içinde yazılır
  });
};

export const verifyToken = (token: string): { userId: number; email: string; role: string } => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number; email: string; role: string };
    return decoded;
  } catch (error) {
    throw new Error("Geçersiz veya süresi dolmuş token");
  }
};


