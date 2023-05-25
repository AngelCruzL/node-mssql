import express, {Express} from 'express';
import cors from 'cors';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory
} from "./controllers/CategoryController";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.get('/', getCategories);
app.post('/', createCategory);
app.get('/:id', getCategoryById);
app.put('/:id', updateCategory);
app.delete('/:id', deleteCategory);

app.listen(3000, () => {
  console.log('Server started at port 3000');
});