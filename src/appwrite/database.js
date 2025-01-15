import { Client, Databases, ID, Storage, Query } from "appwrite"
import ids from "../ids/ids"

class postDatabase {
    client = new Client()
    database
    storage

    constructor() {
        this.client.setEndpoint(ids.appwriteURL).setProject(ids.projetID)

        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async addPost({
        title,
        content,
        status = "active",
        userID,
        featuredImage,
        slug,
    }) {
        try {
            return await this.database.createDocument(
                ids.databaseID,
                ids.collectionID,
                featuredImage,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID,
                    slug,
                },
            )
        } catch (error) {
            console.log(
                "Src :: Appwrite :: Database.js :: PostDatabase :: CreatePost :: ",
                error.message,
            )
            this.deleteImage(featuredImage)
            return false
        }
    }

    async deletePost(postId, imageId) {
        try {
            const deleted = this.deleteImage(imageId)
            if (deleted) {
                return await this.database.deleteDocument(
                    ids.databaseID,
                    ids.collectionID,
                    postId,
                )
            } else {
                return false
            }
        } catch (error) {
            console.log(
                "Src :: Appwrite :: Database.js :: PostDatabase :: DeletePost :: ",
                error.message,
            )
            return false
        }
    }

    async getPost(postId) {
        try {
            return await this.database.getDocument(
                ids.databaseID,
                ids.collectionID,
                postId,
            )
        } catch (error) {
            console.log(
                "Src :: Appwrite :: Database.js :: PostDatabase :: GetPost :: ",
                error.message,
            )
            return false
        }
    }

    async getPosts(query = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(
                ids.databaseID,
                ids.collectionID,
                query,
            )
        } catch (error) {
            console.log(
                "Src :: Appwrite :: Database.js :: PostDatabase :: GetPosts :: ",
                error.message,
            )
            return false
        }
    }

    //Storage Functions

    async addImage({ file }) {
        try {
            return await this.storage.createFile(
                ids.bucketID,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log(
                "Src :: Appwrite :: Database.js :: PostDatabase :: AddImage :: ",
                error.message,
            )
            return false
        }
    }

    async deleteImage(imageId) {
        try {
            return await this.storage.deleteFile(ids.bucketID, imageId)
        } catch (error) {
            console.log(
                "Src :: Appwrite :: Database.js :: PostDatabase :: DeleteImage :: ",
                error.message,
            )
            return false
        }
    }

    getPreview(imageId) {
        try {
            return this.storage.getFilePreview(ids.bucketID, imageId)
        } catch (error) {
            console.log(
                "Src :: Appwrite :: Database.js :: PostDatabase :: getPreview :: ",
                error.message,
            )
            return false
        }
    }
}

const database = new postDatabase()

export default database
