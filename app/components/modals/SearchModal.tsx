'use client';

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

import qs from "query-string";
import { formatISO } from "date-fns/esm";

import useSearchModal from "@/app/hooks/useSerachModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Calendar from "../input/Calendar";
import Counter from "../input/Counter";
import CountrySelect, { CountrySelectValue } from "../input/CountrySelect";
import { type Range } from "react-date-range";


enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState<STEPS>(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState<number>(0);
  const [roomCount, setRoomCount] = useState<number>(0);
  const [bathroomCount, setBathroomCount] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  const [location, setLocation] = useState<CountrySelectValue>();

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location]);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
  
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      bathroomCount,
      roomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);

  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    bathroomCount,
    roomCount,
    dateRange,
    onNext,
    params
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading 
        title='Where do you wanna go ?'
        subtitle="Find the perfect location !"
      />
      <CountrySelect 
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title='when do you plan to go ?'
          subtitle="Make sure everyone is free"
        />
        <Calendar 
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information"
          subtitle="Find your perfect place !"
        />
        <Counter 
          title="Guests"
          subtitle="How many guests are coming ?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
         <Counter 
          title="Rooms"
          subtitle="How many Rooms do you need ?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
         <Counter 
          title="Bathrooms"
          subtitle="How many Bathrooms do you need ?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal 
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );  
}

export default SearchModal;