import {Request, Response} from "express";
import sql from "mssql";

import databaseConfig from "../config/database";

export async function getCategories(req: Request, res: Response) {
  try {
    let pool = await sql.connect(databaseConfig);
    let categories = await pool.request().query("SELECT * from category");
    return res.json(categories.recordsets);
  } catch (error) {
    console.log(error);
  }
}