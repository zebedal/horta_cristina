import { dbConnect, findUser, insertDocument } from "../../db-utils/db-connection"


const handler = async (req, res) => {


    const {username, password, email} = req.body.data

    //verificar se este username já existe
    const client = await dbConnect()
    const result = await findUser(client, email)
    if(result) {
        res.json({message: 'Este utilizador já existe', ok: false})
    } 
    else {
        await insertDocument(client, 'logins', {name: username, password: password, email: email})
        res.json({message:'ok', ok:true})
        client.close()
    }
    
}

export default handler