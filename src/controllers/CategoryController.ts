import {Request, Response} from "express";
import sql from "mssql";

import databaseConfig from "../config/database";
import {CategoryAPIResponse} from "../types/category";

export async function getCategories(req: Request, res: Response) {
  try {
    let pool = await sql.connect(databaseConfig);
    let categories = await pool
      .request()
      .query("SELECT * from category") as CategoryAPIResponse;
    return res.json(categories.recordsets[0]);
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryById(req: Request, res: Response) {
  try {
    const {id} = req.params;
    let pool = await sql.connect(databaseConfig);
    let categories = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * from category WHERE id = @id") as CategoryAPIResponse;
    return res.json(categories.recordsets[0]);
  } catch (error) {
    console.log(error);
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const {name, description} = req.body;
    let pool = await sql.connect(databaseConfig);
    let categories = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.VarChar, description)
      .query(
        "INSERT INTO category (name, description) VALUES (@name, @description)"
      ) as CategoryAPIResponse;
    return res.json(categories.recordsets[0]);
  } catch (error) {
    console.log(error);
  }
}
