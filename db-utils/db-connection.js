import { MongoClient, ObjectId } from "mongodb";

export const dbConnect = async () => {
    const client = await MongoClient.connect("mongodb+srv://zebedal:azerty1978@pagein.lcuao.mongodb.net/horta?retryWrites=true&w=majority")
    return client
}

export const insertDocument = async (client, collection, document) => {
    const db = client.db()
    const result = await db.collection(collection).insertOne(document)
    return result
}

export const getProdutos = async (client, categoria) => {
    const db = client.db()
    if(categoria) {
        const result = await db.collection('produtos').find({tipo: categoria}).toArray()
        return result
    }
    else {
        const result = await db.collection('produtos').find().toArray()
        return result
    }

    
}
export const updateDocument = async (client, collection, id, updatedObj) => {
    const db = client.db()
    const result = await db.collection(collection).updateOne({"_id": ObjectId(id)}, {$set: updatedObj})
    return result
}

export const deleteDocument = async (client, collection, id) => {
    const db = client.db()
    const result = await db.collection(collection).deleteOne({"_id": ObjectId(id)})
    return  result
    
}

