import { dbConnect, findUser } from "../../db-utils/db-connection"


const handler = async (req, res) => {


    const {username, password} = req.body.data

    //verificar se este username já existe
    const client = await dbConnect()
    const result = await findUser(client, username)
    if(!result) {
        res.json({message: 'Este utilizador não existe', ok: false})
    } else if(result.password !== password) {
        res.json({message: 'A password está incorrecta', ok: false})
    }
    else {
        res.json({message:'ok', ok:true})
        client.close()
    }
    
}

export default handler