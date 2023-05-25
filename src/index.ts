import express, {Express} from 'express';
import cors from 'cors';
import {getCategories, getCategoryById} from "./controllers/CategoryController";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.get('/', getCategories);
app.get('/:id', getCategoryById);

app.listen(3000, () => {
  console.log('Server started at port 3000');
});