import { dbConnect, getProdutos } from "../../db-utils/db-connection"


const handler = async (req, res) => {

    const tipo = req.body.tipo

    console.log(tipo)

    try {
        const client = await dbConnect()
        const updateResponse = await getProdutos(client, tipo)
        client.close()
        res.send(updateResponse)
    } catch(e) {
        console.log(e)
    }
    
}

export default handler