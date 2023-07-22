'use client'

import { 
  FC, 
  useCallback, 
  useMemo, 
  useState, 
  useEffect 
} from "react";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns/esm";
import axios from "axios";
import toast from "react-hot-toast";

import { categories } from "../navbar/Categories";
import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import ListingReservation from "./ListingReservation";

import useLoginModal from "@/app/hooks/useLoginModal";
import type { SafeUser, SafeListing, safeReservation } from "@/app/types";
import type { Range } from "react-date-range";



const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser
  };
  currentUser?: SafeUser | null;
  reservations?: safeReservation[]
}

export interface InititalDateRangeType {
  startDate: Date,
  endDate: Date,
  key: 'selection'
}

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const loginModal = useLoginModal();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    
    reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(listing.price);
  const [dateRange, setDateRanges] = useState<Range>(
    initialDateRange
  );

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios.post('/api/reservations', {
      totalPrice,
      listingId: listing.id,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate
    })
    .then(() => {
      toast.success('Listing reserved !');
      setDateRanges(initialDateRange);
      // Redirect to trips
      router.push('/trips');
    })
    .catch((error) => {
      toast.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [
    totalPrice,
    dateRange,
    listing.id,
    router,
    currentUser,
    loginModal,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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
              <div
                className="
                  order-first
                  mb-10
                  md:order-last
                  md:col-span-3
                "
              >
                <ListingReservation 
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRanges(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ListingClient;