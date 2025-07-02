import { Request, Response } from "express";
import { getProfileService } from "./users.service";

export const getProfile = async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;

  try {
    const user = await getProfileService(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası", error });
  }
};
