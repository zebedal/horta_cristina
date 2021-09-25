import { dbConnect, insertDocument } from "../../db-utils/db-connection"


const handler = async (req, res) => {


    const {nome, Preco, image_url} = req.body
    const newObj = {
        nome: nome,
        Preco: +Preco,
        image_url: image_url
    }
 
   
    try {
        const client = await dbConnect()
        const updateResponse = await insertDocument(client,'produtos', newObj)
        res.send(updateResponse)
    } catch(e) {
        console.log(e)
    }
    
}

export default handler