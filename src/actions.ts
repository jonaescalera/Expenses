import React, { Dispatch } from "react";
import { ACTIONTYPE } from "./context/ThemeContext";
import { createTable,
         deleteTodoItem, 
         getDBConnection, 
         getTodoItems, 
         saveTodoItems } from "./db-service";
import { Expense } from "./models/Expense";

export const getItems = ():ACTIONTYPE => {

    // const db =  await getDBConnection();
    // await createTable(db);
    // const storeItems = await getTodoItems(db);
    //const payload = ;
    let obj:ACTIONTYPE; 
    fetchItems()
    .then((res) =>{
        
    obj = {
        type: "GET_ITEMS",
        payload: res//storeItems
    };
        return obj;
    })    
    .catch(() => []);

    
    return obj;
};

export const init_app = (): ACTIONTYPE => {
    return {
        type: "INIT"
    };
};

export const addItem = async (newTodos:Expense) => {
    const db = await getDBConnection();
    await saveTodoItems(db, newTodos);
};

export const deleteExpense = async (id:number) => {
    const db = await getDBConnection();
    const result = await deleteTodoItem(db, id);
    return result;
};

export const fetchItems = async () =>  {
   const db =  await getDBConnection();
   await createTable(db);
   const storeItems = await getTodoItems(db);
   return storeItems;    
};