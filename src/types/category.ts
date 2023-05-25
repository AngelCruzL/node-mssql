export type Category = {
  id: number;
  name: string;
  description: string;
}

export type CategoryWithoutId = Omit<Category, 'id'>;

export type CategoryAPIResponse = {
  recordsets: Array<Category[]>;
}
