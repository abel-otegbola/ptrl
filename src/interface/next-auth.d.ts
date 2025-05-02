import type { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            fullname?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string; // Add the custom role property here
        };
    }
}