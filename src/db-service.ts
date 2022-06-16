import { openDatabase, SQLiteDatabase, enablePromise } from "react-native-sqlite-storage";
import Expense from "./models/Expense";

const tableName = "expense";

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({name: "budget-data.db", location: "default"});
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
    value TEXT NOT NULL);`;

  await db.executeSql(query);  
};

export const getTodoItems = async (db: SQLiteDatabase): Promise<Expense[]> => {
    try {
      const todoItems: Expense[] = [];
      const results = await db.executeSql(`
      SELECT rowid as id,name,price,date FROM ${tableName}`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          todoItems.push(result.rows.item(index));
        }
      });
      return todoItems;
    } catch (error) {
      console.error(error);
      throw Error("Failed to get todoItems !!!");
    }
};

export const saveTodoItems = async (db: SQLiteDatabase, todoItems: Expense[]) => {
    const insertQuery =
      `INSERT OR REPLACE INTO ${tableName}(rowid, name, price, date) values` +
      todoItems.map(i => `('${i.name}', '${i.price}', '${i.date}')`).join(",");
  
    return db.executeSql(insertQuery);
};