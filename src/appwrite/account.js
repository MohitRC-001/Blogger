import { Client, Account, ID } from "appwrite"
import ids from "../ids/ids"

class UserAccount {
    client = new Client()
    account

    constructor() {
        this.client.setEndpoint(ids.appwriteURL).setProject(ids.projetID)

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const data = await this.account.create(
                ID.unique(),
                email,
                password,
                name,
            )
            if (data) {
                return this.login({ email, password })
            }
        } catch (error) {
            console.log(
                "Src :: Appwrite :: Account.js :: UserAccount :: CreateAccount :: ",
                error.message,
            )
            return false
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password,
            )
        } catch (error) {
            console.log(
                "Src :: Appwrite :: Account.js :: UserAccount :: Login :: ",
                error.message,
            )
            return false
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log(
                "Src :: Appwrite :: Account.js :: UserAccount :: Logout :: ",
                error.message,
            )
            return false
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log(
                "Src :: Appwrite :: Account.js :: UserAccount :: getUser :: ",
                error.message,
            )
            return false
        }
    }
}

const userAccount = new UserAccount()

export default userAccount
