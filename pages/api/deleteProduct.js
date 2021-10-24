import { dbConnect, deleteDocument } from "../../db-utils/db-connection"


const handler = async (req, res) => {

    const {collection} = req.body

    try {
        const client = await dbConnect()
        const deleteId = await deleteDocument(client, collection, req.body.id)
        res.send(deleteId)
    } catch(e) {
        console.log(e)
    }
    
}

export default handler