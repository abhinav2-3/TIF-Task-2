import React, { createContext, useContext, useState } from "react";

const initialValues = {
  requisitionDetails: {
    gender: "",
    noOfOpenings: 0,
    requisitionTitle: "",
    urgency: "",
  },
  jobDetails: {
    jobDetails: "",
    jobLocation: "",
    jobTitle: "",
  },
  interviewSettings: {
    interviewDuration: "",
    interviewLanguage: "",
    interviewMode: "",
  },
};

type InitialValuesType = typeof initialValues;

const DataContext = createContext<{
  state: typeof initialValues;
  setRequisitionDetails: (
    details: Partial<InitialValuesType["requisitionDetails"]>
  ) => void;
  setJobDetails: (details: Partial<InitialValuesType["jobDetails"]>) => void;
  setInterviewSettings: (
    settings: Partial<InitialValuesType["interviewSettings"]>
  ) => void;
} | null>(null);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState(initialValues);

  // Step 1: Create setter functions for each piece of state
  const setRequisitionDetails = (
    details: Partial<InitialValuesType["requisitionDetails"]>
  ) => {
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        ...details,
      },
    }));
  };

  const setJobDetails = (details: Partial<InitialValuesType["jobDetails"]>) => {
    setState((prevState) => ({
      ...prevState,
      jobDetails: {
        ...prevState.jobDetails,
        ...details,
      },
    }));
  };

  const setInterviewSettings = (
    settings: Partial<InitialValuesType["interviewSettings"]>
  ) => {
    setState((prevState) => ({
      ...prevState,
      interviewSettings: {
        ...prevState.interviewSettings,
        ...settings,
      },
    }));
  };

  return (
    <DataContext.Provider
      value={{
        state,
        setRequisitionDetails,
        setJobDetails,
        setInterviewSettings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

export default DataProvider;
