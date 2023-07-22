import { FC } from "react";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import FavoritesClient from "./FavoritesClient";

import getCurrentUser from "../api/actions/getCurrentUser";
import getFavorites from "../api/actions/getFavorites";

const FavoritesPage = async () => {
  const listings = await getFavorites();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title='No favorites found'
          subtitle="Looks like you have no favorite listings"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient 
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default FavoritesPage;