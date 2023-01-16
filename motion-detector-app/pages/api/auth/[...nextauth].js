import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        //Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        // Github Provider
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {

                const email = credentials.email
                const password = credentials.password

                const data = {email, password}

                const res = await fetch('http://localhost:4000/login-user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                const json = await res.json();

                const name = json.username
                const email_json = json.email

                console.log(json.message)
                
                if (json.message === "Success") {
                    console.log({name, email});
                    return {name, email_json};
                } else {
                    throw new Error(json.message);
                }
                
            }
        })
    ]
});