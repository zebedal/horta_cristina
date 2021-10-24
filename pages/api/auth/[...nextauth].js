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
                    const userData = await usersCollection.findOne({email: credentials.email})

                    if(!userData) {
                        client.close()
                        throw new Error('Utilizador não existe!');
                    }
                    if(userData.password !== credentials.password) {
                        client.close()
                        throw new Error('A password está incorrecta!');
                    }

                    client.close()

                    const user = {
                        name: userData.name
                    }
                    
                    return user
                }

              
                const usersCollection = client.db().collection('users');
                const userData = await usersCollection.findOne({name: credentials.nome})

            

                if(!userData) {
                    client.close()
                    throw new Error('Utilizador não existe!');
                }

                if(userData.password !== credentials.password) {
                    client.close()
                    throw new Error('A password está incorrecta!');
                }

                client.close()
                const user = {
                    name: userData.name
                }
                return user

            }
        })
    ],
    callbacks: {
        jwt: async (token, user) => {
            //  "user" parameter is the object received from "authorize"
            //  "token" is being send below to "session" callback...
            //  ...so we set "user" param of "token" to object from "authorize"...
            //  ...and return it...
            user && (token.user = user.name);
            return token 
        },
        session: async (session, user) => {
         
            return session
        }
      }
});