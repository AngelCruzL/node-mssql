import sql from "mssql";

import {Category, CategoryWithoutId} from "../types/category";
import databaseConfig from "../config/database";

export async function getCategories() {
  try {
    let pool = await sql.connect(databaseConfig);
    let categories = await pool
      .request()
      .query<Category[]>("SELECT * from category");

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
      .query<Category[]>("SELECT * from category WHERE id = @id");

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
      .query<Category[]>(
        "INSERT INTO category (name, description) VALUES (@name, @description)"
      );

    return categories.recordsets[0];
  } catch (error) {
    console.log(error);
  }
}

export async function updateCategory(
  id: number,
  options: Partial<CategoryWithoutId>
) {
  const {name, description} = options;

  try {
    let pool = await sql.connect(databaseConfig);
    let categories = await pool
      .request()
      .query<Category[]>(
        `UPDATE category
         SET ${name ? `name = '${name}'` : ''} ${name && description ? ',' : ''} ${description ? `description = '${description}'` : ''}
         WHERE id = ${id}`
      );

    return categories.recordsets[0];
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCategory(id: number) {
  try {
    let pool = await sql.connect(databaseConfig);
    await pool
      .request()
      .query(`DELETE
              FROM category
              WHERE id = ${id}`);
  } catch (error) {
    console.log(error);
  }
}