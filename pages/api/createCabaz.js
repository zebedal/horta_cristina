import { dbConnect, insertDocument } from "../../db-utils/db-connection"


const handler = async (req, res) => {

    const {nome, Preco, image_url, tipo, produtos, produtosLabels} = req.body

    const newObj = {
        nome: nome,
        Preco: parseFloat(Preco),
        tipo: tipo,
        produtos,
        produtosLabels,
        image_url: image_url
    }
   
    try {
        const client = await dbConnect()
        const updateResponse = await insertDocument(client, 'cabazes', newObj)
        res.send(updateResponse)
    } catch(e) {
        res.send(e)
    }
    
}

export default handler