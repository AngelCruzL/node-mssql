import sql from "mssql";

import {CategoryAPIResponse, CategoryWithoutId} from "../types/category";
import databaseConfig from "../config/database";

export async function getCategories() {
  try {
    let pool = await sql.connect(databaseConfig);
    let categories = await pool
      .request()
      .query("SELECT * from category") as CategoryAPIResponse;
    return categories.recordsets[0];
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryById(id: number) {
  try {
    let pool = await sql.connect(databaseConfig);
    let categories = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * from category WHERE id = @id") as CategoryAPIResponse;
    return categories.recordsets[0];
  } catch (error) {
    console.log(error);
  }
}

export async function createCategory(options: CategoryWithoutId) {
  try {
    const {name, description} = options;
    let pool = await sql.connect(databaseConfig);
    let categories = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.VarChar, description)
      .query(
        "INSERT INTO category (name, description) VALUES (@name, @description)"
      ) as CategoryAPIResponse;
    return categories.recordsets[0];
  } catch (error) {
    console.log(error);
  }
}
