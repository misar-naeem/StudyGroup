import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import connectMongo from "../../../util/mongodb";
import Staff from "../../../models/Staff";

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log(`${user.email} signed in`);
      return true;
    },
    async signOut({ user }) {
      console.log(`${user.email} signed out`);
      return true;
    },
    // If there was a role in the database, we would use it to determine the role,
    // but since we don't we search for the user in the staff table instead
    async session({ session }) {
      try {
        await connectMongo();
        const result = await Staff.find({ email: session.user.email });
        if (result.length > 0) {
          session.user.role = "staff";
        } else {
          session.user.role = "student";
        }
      } catch (error) {
        console.log(error);
      }
      return session;
    },
  },
});
