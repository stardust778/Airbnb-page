'use client';

import { FC, useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { safeReservation, SafeUser } from "../types";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import toast from "react-hot-toast";

interface ReservationsClientProps {
  currentUser?: SafeUser | null;
  reservations: safeReservation[];
}

const ReservationsClient: FC<ReservationsClientProps> = ({
  currentUser,
  reservations
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation cancelled');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setDeletingId('');
      })
  }, [router]);
 
  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
      />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations.map((reservation) => (
          <ListingCard 
            key={reservation.id}
            data={reservation.list}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default ReservationsClient;