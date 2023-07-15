import { User, Listing } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updateAt" | "emailVerified"
> & {
  createdAt: string;
  updateAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<
  Listing,
  "createdAt"
> & {
  createdAt: string;
}