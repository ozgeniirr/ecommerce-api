import jwt from "jsonwebtoken";

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d", // burası kod içinde yazılır
  });
};


export const verifyToken = (token: string): { userId: number } => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    return decoded;
  } catch (error) {
    throw new Error("Geçersiz veya süresi dolmuş token");
  }
};

