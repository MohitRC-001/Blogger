import database from "../appwrite/database"

export default async function getPostData() {
    return await database.getPosts().then((res) => {
        if (res) {
            return res.documents
        } else {
            return false
        }
    })
}
