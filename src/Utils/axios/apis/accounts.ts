import { AxiosInstance } from "axios";

import api from "../axios";


class Accounts {
  constructor(private readonly request: AxiosInstance) {}

 
  async GetAccounts(userId: string){
    return this.request.get(`/user/Branch/?userId=${userId}`)
  }

  async AddAccount(data: {
    BranchId: string,
      BranchName : string,
      Address: string,
      Description: string,
      UserId: string,
      AccountId: string,
  }){
    return this.request.post("/user/Branch/create", data)
  }
}

const AccountService = new Accounts(api)

export default AccountService
