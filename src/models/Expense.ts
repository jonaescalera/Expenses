class Expense {
    _id = "";
    _name = "";
    _price = "";
    _date = ""

    constructor(name: string, price: string, date: string) {
      this._name = name;  
      this._price = price;
      this._date = date;    
    }

    get name (): string {
      return this._name;
    }
    get price (): string {
      return this._price;
    }
    get date (): string {
      return this._date;
    }
       
  
}

export default Expense;