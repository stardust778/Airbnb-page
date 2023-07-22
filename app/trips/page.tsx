import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../api/actions/getCurrentUser";
import getReservation from "../api/actions/getReservations";
import TripClient from "./TripClient";

const TripPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservation({ 
    userId: currentUser.id 
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="No trips found"
          subtitle="Looks like you haven't reserved any trip"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripClient 
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default TripPage;