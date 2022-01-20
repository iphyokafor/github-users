import { Request, Response } from "express";
import octo from "../services/search.service";

const { searchByLang } = octo;

export async function gitHubUsersSearchHandler(req: Request, res: Response) {
  try {
    const { lang } = req.params;
    const { limit } = req.query;
    const searchUsers = await searchByLang(lang, limit);

    return res.status(200).send({
      success: true,
      users: searchUsers,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong.",
    });
  }
}
