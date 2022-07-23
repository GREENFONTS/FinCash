import { AxiosInstance } from "axios";

import api from "../axios";

class Accounts {
  constructor(private readonly request: AxiosInstance) {}

  async GetAccounts(userId: string) {
    return this.request.get(`/user/branch/?userId=${userId}`);
  }

  async AddAccount(data: {
    BranchId: string;
    BranchName: string;
    Address: string;
    Description: string;
    UserId: string;
    AccountId: string;
  }) {
    return this.request.post("/user/branch/create", data);
  }

  async UpdateAccount(data: {
    BranchId: string;
    BranchName: string;
    Address: string;
    Description: string;
    UserId: string;
    AccountId: string;
  }) {
    return this.request.put(`/user/branch/${data.BranchId}`, data);
  }

  async GetAccountId(data: { BranchId: string; code: string; id: string }) {
    return this.request.get(
      `/user/branch/AccountId/${data.BranchId}?code=${data.code}`,
    );
  }

  async GetAccountInfo(branchId: string) {
    return this.request.get(`/user/branch/AccountInfo/${branchId}`);
  }

  async GetAccountIdentity(userId: string) {
    return this.request.get(`/user/branch/AccountIdentity/${userId}`);
  }

  async GetAccountTransactions(branchId: string) {
    return this.request.get(`/user/branch/Transactions/${branchId}`);
  }

  async GetAllTransactions(userId: string) {
    return this.request.get(`/user/branch/AllTransactions/${userId}`);
  }

  async UnlinkAccount(branchId: string) {
    return this.request.get(`/user/branch/UnlinkAccount/${branchId}`);
  }
}

const AccountService = new Accounts(api);

export default AccountService;
