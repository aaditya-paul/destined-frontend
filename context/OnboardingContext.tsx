import React, { createContext, useContext, useState } from "react";
import { OnboardingContextType, OnboardingData, PollData } from "./types";

const defaultPoll: PollData = {
  question: "Best way to spend a Sunday?",
  options: [
    { label: "Brunch & Mimosas", percent: "45%" },
    { label: "Hiking Nature", percent: "30%" },
    { label: "Gaming Marathon", percent: "25%" },
  ],
};

const defaultData: OnboardingData = {
  firstName: "",
  lastName: "",
  dateOfBirth: new Date(2000, 0, 1),
  gender: "",
  lookingFor: "",
  location: "",
  height: "",
  jobTitle: "",
  school: "",
  bio: "",
  interests: [],
  poll: defaultPoll,
  voiceNoteDuration: null,
  images: new Array(6).fill(undefined),
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<OnboardingData>(defaultData);

  const updateData = (partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const resetData = () => {
    setData(defaultData);
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
