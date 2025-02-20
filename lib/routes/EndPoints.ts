import { InvoiceType } from "@/app/(root)/setting/[...slug]/page";
import { ButtonType } from "@/app/(root)/warehouse/components/row-buttons";

export const URL = `${process.env.NEXT_PUBLIC_API_URL}`;
export const api = `${process.env.NEXT_PUBLIC_API_URL}/`;

export const EndPoints = {
  // Auth EndPoints
  login: `${api}user/login`,
  register: `${api}register`,
  logout: `${api}logout`,
  currency: {
    getCurrency: `${api}user/currency/all`,
    updateCurrency: `${api}user/currency/update`,
  },
  transaction: {
    getAllTransaction: (
      type: "expense" | "profit" | "withdraw" | "deposit" | "",
      page: number = 1,
      date: string
    ) => {
      const queryParams = [];

      if (type) {
        queryParams.push(`type=${type}`);
      }
      if (date) {
        queryParams.push(`date=${date}`);
      }

      const queryString =
        queryParams.length > 0 ? `${queryParams.join("&")}` : "";
      return `${api}transaction/all?page=${page || 1}&${queryString}`;
    },
    addTrasaction: `${api}transaction/add`,
    addSubjectTransaction: `${api}transaction/subject/add`,
    getAllSubjectTransaction: `${api}transaction/subject/all`,
    getCashTransaction: `${api}transaction/cash/account/all`,
    transferTransaction: `${api}transaction/transfer`,
  },
  order: {
    orderFood: `${api}order/add`,
    getOneOrder: (id: number) => `${api}order/${id}`,
    oneOrderFood: (id: number) => `${api}order/add/${id}`,
    orderPay: (id: number) => `${api}order/pay/${id}`,
    orderCancle: (id: number) => `${api}order/cancel/${id}`,
    orderFinish: (id: number) => `${api}order/finish/${id}`,
    getOrderOptions: `${api}property/order/option/all`,
    addOrderOptions: `${api}property/order/option/add`,
    deleteOrderOptions: (id: number) => `${api}property/order/option/${id}`,
  },
  table: {
    getReportTable: `${api}report/table`,
    getAllTableWithoutFloar: `${api}table/all`,
    getAllTable: (floar: number, page: number = 1) => {
      if (floar) {
        return `${api}table/all?floar=${floar}&page=${page}`;
      }
      return `${api}table/all?page=${page}`;
    },
    addTable: `${api}table/add`,
    reserveTable: (id: number) => `${api}table/reserve/${id}`,
    updateTable: (id: number) => `${api}table/${id}`,
    deleteTable: (id: number) => `${api}table/${id}`,
  },
  warehouse: {
    getReportItem: `${api}report/item`,
    getAllItem: (
      category_id: number,
      page: number = 1,
      state: ButtonType,
      search: string
    ) => {
      const isNumeric = (value: string): boolean => {
        // This will return true for integers, decimals, and exponential notation
        // Returns false for empty strings, whitespace, and non-numeric text
        return !isNaN(parseFloat(value)) && isFinite(Number(value));
      };
      const queryParams = [];
      if (category_id) {
        queryParams.push(`item_category_id=${category_id}`);
      }
      if (search) {
        queryParams.push(`keyword=${search}`);
      }
      if (state && isNumeric(state) && Number(state) > 0) {
        queryParams.push(`state=low_quantity&low_quantity=${Number(state)}`);
      } else if (state) {
        queryParams.push(`state=${state}`);
      }
      const queryString =
        queryParams.length > 0 ? `${queryParams.join("&")}` : "";

      return `${api}item/all?${queryString}&page=${page}`;
    },
    getAllItemWithSearch: (search: string) => {
      if (search) {
        return `${api}item/all?keyword=${search}`;
      }
      return `${api}item/all`;
    },
    addItem: `${api}item/add`,
    updateItem: (id: number) => `${api}item/${id}`,
    deleteItem: (id: number) => `${api}item/${id}`,
    itemOrder: `${api}order/add`,
    item_all: `${api}item/dropdown/all`,
  },
  loans: {
    getAllLoans: (type: string, name: string, page: number = 1) => {
      if (name) {
        return `${api}partie/loan/all?type=${type}&keyword=${name}&page=${page}`;
      }
      return `${api}partie/loan/all?type=${type}&page=${page}`;
    },
    getOneLoan: (id: number) => `${api}partie/loan/all/${id}`,
    reciveLoan: `${api}partie/loan/recive`,
    giveLoan: `${api}partie/loan/give`,
  },
  category: {
    getAllCategory: `${api}category/all`,
    getItemCategory: `${api}category/item/all`,
    addCategory: `${api}category/add`,
    addItenCategory: `${api}category/item/add`,
    deleteCategoryItem: (id: number) => `${api}category/item/${id}`,
  },
  employees: {
    getAllEmployee: (name: string, page: number = 1) => {
      if (name) {
        return `${api}employee/all?keyword=${name}&page=${page}`;
      }
      return `${api}employee/all?page=${page}`;
    },
    getEmployees: `${api}employee/all`,
    addEmployee: `${api}employee/add`,
    deleteEmployee: (id: number) => `${api}employee/${id}`,
    updateEmployee: (id: number) => `${api}employee/${id}`,
    payEmployee: `${api}invoice/salary/add`,
  },
  supplier_customer: {
    getAllSupplierOrCustomer: (type: "supplier" | "customer") => {
      return `${api}partie/dropdown/all?type=${type}`;
    },
  },
  food: {
    getAllFood: (category_id: number, page: number = 1) => {
      if (category_id) {
        return `${api}food/all?category_id=${category_id}&page=${page}`;
      }
      return `${api}food/all?page=${page}`;
    },
    addFood: `${api}food/add`,
    updateFood: (id: number) => `${api}food/${id}`,
    changeStatusFood: (id: number) => `${api}food/sold/${id}`,
    deleteFood: (id: number) => `${api}food/${id}`,
    soldFood: (id: number) => `${api}food/sold/${id}`,
  },
  question: {
    getAllQuestion: `${api}property/question/all`,
    addQuestion: `${api}property/question/add`,
    deleteQuestion: (id: number) => `${api}property/question/${id}`,
    addFoodQuestion: `${api}property/food/question/add`,
    deleteFoodQuestion: (id: number) => `${api}property/food/question/${id}`,
  },
  options: {
    getAllOptions: `${api}property/option/all`,
    addOptions: `${api}property/option/add`,
    deleteOptions: (id: number) => `${api}property/option/${id}`,
    addOptionQuestion: `${api}property/food/option/add`,
    deleteOptionQuestion: (id: number) => `${api}property/food/option/${id}`,
  },
  invoice: {
    getAllInvoice: (
      invoice_type: InvoiceType | "",
      payment_type: "loan" | "cash" | "",
      time: string,
      date: string,
      finish: string,
      page: number
    ) => {
      const queryParams = [];

      if (invoice_type) {
        queryParams.push(`invoice_type=${invoice_type}`);
      }
      if (payment_type) {
        queryParams.push(`payment_type=${payment_type}`);
      }
      if (time) {
        queryParams.push(`time=${time}`);
      }
      if (finish === "false") {
        queryParams.push(`finish=${false}`);
      }
      if (finish === "true") {
        queryParams.push(`finish=${true}`);
      }
      if (date) {
        // range=02-06-2025to02-14-2025  split it and get the start and end date
        const [start, end] = date.split("to");
        queryParams.push(`start_date=${start}`);
        queryParams.push(`end_date=${end}`);
      }

      const queryString =
        queryParams.length > 0 ? `${queryParams.join("&")}` : "";
      return `${api}invoice/all?page=${page || 1}&${queryString}`;
    },
    getOneInvoice: (id: number) => `${api}invoice/all/${id}`,
    addInvoice: `${api}invoice/add`,
    deleteInvoice: (id: number) => `${api}invoice/${id}`,
    finishInvoice: (id: number) => `${api}invoice/finish/${id}`,
    addItemInvoice: `${api}invoice/item/add`,
    deleteItemInvoice: (id: number) => `${api}invoice/item/${id}`,
    addItemExpensesInvoice: `${api}invoice/expense/add`,
    deleteItemExpensesInvoice: (id: number) => `${api}invoice/expense/${id}`,
    itemReturn: (id: number) => `${api}invoice/item/return/${id}`,
  },
  customer: {
    getAllCustomer: (search: any, status: any, plan: any, page: any) => {
      const queryParams = [];

      if (search) {
        queryParams.push(`keyword=${search}`);
      }

      if (status) {
        queryParams.push(`state=${status}`);
      }
      if (plan) {
        queryParams.push(`plan_id=${plan}`);
      }
      const queryString =
        queryParams.length > 0 ? `${queryParams.join("&")}` : "";
      return `${api}customer/all?page=${page || 1}&${queryString}`;
    },
    deActiveCustomer: (id: string) => `${api}customer/${id}`,
  },
  active_code: {
    getAllActiveCode: (status: any, plan: any, page: any) => {
      const queryParams = [];

      if (status) {
        queryParams.push(`state=${status}`);
      }
      if (plan) {
        queryParams.push(`plan_id=${plan}`);
      }
      const queryString =
        queryParams.length > 0 ? `${queryParams.join("&")}` : "";
      return `${api}activation/all?page=${page || 1}&${queryString}`;
    },
    addCode: `${api}activation/add`,
    deleteCode: (id: string) => `${api}activation/${id}`,
  },

  admin: {
    getAllRole: `${api}role/get/all`,
    getAllPermission: `${api}role/get/permissions`,
    getOneRoleID: (id: string) => `${api}role/get/one/${id}`,
    addRole: `${api}role/add`,
    updateRole: (id: string) => `${api}role/update/${id}`,
    deleteRole: (id: string) => `${api}role/delete/${id}`,
  },
  expenses: {
    getAllExpenses: `${api}expenses/all`,
    addExpenses: `${api}expenses/add`,
    updateDeleteExpenses: (id: number) => `${api}expenses/${id}`,
  },
  user: {
    getAllUser: `${api}user/all`,
    addUser: `${api}user/add`,
    updateUser: (id: number) => `${api}user/${id}`,
    deleteUser: (id: string) => `${api}user/${id}`,
  },
  report: {
    getReport: `${api}report/all`,
    getAllReport: (time: string, date: string) => {
      const queryParams = [];
      if (time) {
        queryParams.push(`time=${time}`);
      }
      if (date) {
        const [start, end] = date.split("to");
        queryParams.push(`start_date=${start}`);
        queryParams.push(`end_date=${end}`);
      }
      const queryString =
        queryParams.length > 0 ? `${queryParams.join("&")}` : "";
      return `${api}report/all/detail?${queryString}`;
    },
  },
};
