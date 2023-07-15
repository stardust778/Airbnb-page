'use client'

import { FC, useMemo } from "react";
import { SafeUser, SafeListing } from "@/app/types";
import { Reservation } from "@prisma/client";
import { categories } from "../navbar/Categories";
import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser
  };
  currentUser?: SafeUser | null;
  reservations?: Reservation
}

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <div>
      <Container>
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col gap-6">
            <ListingHead 
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationValue={listing.locationValue}
              id={listing.id}
              currentUser={currentUser}
            />
            <div className="
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
              mt-6
            ">
              <ListingInfo
                user={listing.user}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ListingClient;