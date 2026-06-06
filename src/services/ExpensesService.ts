import { EntityService } from "./EntityService";
import { IExpense } from "../types/domain/IExpense";

export class ExpensesService extends EntityService<IExpense> {
  constructor() {
    super("/expenses");
  }
}
