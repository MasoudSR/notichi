import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { connectMongoDB } from "@/app/lib/mongodb"
import User from "@/app/models/user"

export const authOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GithubProvider({
          clientId:process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!
        })
      ],
      secret:process.env.NEXTAUTH_SECRET,
      callbacks:{
        async signIn({user , account} : any){
          console.log(user)
          console.log(account)
          const {email , name , image } = user
          await connectMongoDB()
          const userExists = await User.findOne({email})

          if (userExists) {
            console.log("user exist")
          }else{
            await User.create({email , name , image})
          }

          return user
        }

        },
      }

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }