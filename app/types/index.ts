import { User, Listing, Reservation } from "@prisma/client";

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

export type safeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "list"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  list: SafeListing;
}