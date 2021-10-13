import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { dbConnect } from "../../../db-utils/db-connection";


export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const client = await dbConnect();

                if(credentials.userType === 'client') {
                    const usersCollection = client.db().collection('logins');
                    const user = await usersCollection.findOne({userName: credentials.email})

                    if(!user) {
                        client.close()
                        throw new Error('Utilizador não existe!');
                    }

                    if(user.password !== credentials.password) {
                        client.close()
                        throw new Error('A password está incorrecta!');
                    }

                    client.close()
                        return {
                            email: user.email,
                            nome: user.nome
                        }
                }

                const usersCollection = client.db().collection('users');

                const user = await usersCollection.findOne({name: credentials.nome})

                if(!user) {
                    client.close()
                    throw new Error('Utilizador não existe!');
                }

                if(user.password !== credentials.password) {
                    client.close()
                    throw new Error('A password está incorrecta!');
                }

                client.close()
                return {
                    email: user.email
                }
   

            }
        })
    ]
});