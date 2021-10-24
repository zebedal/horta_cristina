import { dbConnect, getCabazes } from "../../db-utils/db-connection"


const handler = async (req, res) => {


    try {
        const client = await dbConnect()
        const updateResponse = await getCabazes(client)
        client.close()
        res.send(updateResponse)
    } catch(e) {
        res.send(e)
    }
    
}

export default handler