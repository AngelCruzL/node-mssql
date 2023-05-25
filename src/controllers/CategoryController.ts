import {NextFunction, Request, Response} from "express";
import * as categoryService from "../services/CategoryService";

export async function getCategories(req: Request, res: Response) {
  const categories = await categoryService.getCategories();
  return res.json(categories);
}

export async function getCategoryById(req: Request, res: Response) {
  try {
    const result = await categoryService.getCategoryById(+req.params.id);
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
}

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const {name, description} = req.body;

    if (!name || !description) {
      next(res.json({message: "Name and description must be provided"}));
    }

    const result = await categoryService.createCategory(req.body);
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
}
