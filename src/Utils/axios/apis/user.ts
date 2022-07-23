import { AxiosInstance } from "axios";

import api from "../axios";

class User {
  constructor(private readonly request: AxiosInstance) {}

  async CreateUser(data: {
    username: string;
    email: string;
    password: string;
    Id: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
  }) {
    return this.request.post("/register", data)
  }

  async UpdateUser(data: {
    username: string;
    email: string;
    password: string;
    Id: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
  }) {
    return this.request.post(`/user/${data.Id}`, data)
  }

  async Login(data: {
    email: string;
    password: string
  }){
    return this.request.post("/login", data)
  }

  async VerifyToken(token: string){
    return this.request.get(`/verifyToken?token=${token}`)
  }

  async AddServiceKeys(data: {
    monoPrivateKey: string,
      monoSecretKey: string,
      UserId: string,
      FlutterKey: string
  }){
    return this.request.post('/AddServiceKeys', data)
  }
}

const UserService = new User(api)

export default UserService
