import { createContext, useEffect, useReducer, useState } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

type Field = {
  value: string;
  hasError: boolean;
  errorMessage: string;
};

const initialState = {
  value: "",
  hasError: false,
  errorMessage: "",
};

type FormContextData = {
  nameField: Field;
  dispatchNameField: React.Dispatch<any>;
  role1: Field;
  dispatchRole1Field: React.Dispatch<any>;
  class1: Field;
  dispatchClass1Field: React.Dispatch<any>;
  spec1: Field;
  dispatchSpec1Field: React.Dispatch<any>;
  role2: Field;
  dispatchRole2Field: React.Dispatch<any>;
  class2: Field;
  dispatchClass2Field: React.Dispatch<any>;
  spec2: Field;
  dispatchSpec2Field: React.Dispatch<any>;
  role3: Field;
  dispatchRole3Field: React.Dispatch<any>;
  class3: Field;
  dispatchClass3Field: React.Dispatch<any>;
  spec3: Field;
  dispatchSpec3Field: React.Dispatch<any>;
  salesInterest: boolean;
  setSalesInterest: React.Dispatch<React.SetStateAction<boolean>>;
  otherGamesInterest: boolean;
  setOtherGamesInterest: React.Dispatch<React.SetStateAction<boolean>>;
  movieNightInterest: boolean;
  setMovieNightInterest: React.Dispatch<React.SetStateAction<boolean>>;
  otherEventsComment: Field;
  dispatchOtherEventsComment: React.Dispatch<any>;
  recruitInterest: boolean;
  setRecruitInterest: React.Dispatch<React.SetStateAction<boolean>>;
  recruitInterestComment: Field;
  dispatchRecruitInterestComment: React.Dispatch<any>;
  salesLeadershipInterest: boolean;
  setsalesLeadershipInterest: React.Dispatch<React.SetStateAction<boolean>>;
  salesLeadershipInterestComment: Field;
  dispatchsalesLeadershipInterestComment: React.Dispatch<any>;
  additionComments: Field;
  dispatchAdditionComments: React.Dispatch<any>;
  clearForm: () => void;
};

export const FormContext = createContext({
  nameField: initialState,
  dispatchNameField: () => {},
  role1: initialState,
  dispatchRole1Field: () => {},
  class1: initialState,
  dispatchClass1Field: () => {},
  spec1: initialState,
  dispatchSpec1Field: () => {},
  role2: initialState,
  dispatchRole2Field: () => {},
  class2: initialState,
  dispatchClass2Field: () => {},
  spec2: initialState,
  dispatchSpec2Field: () => {},
  role3: initialState,
  dispatchRole3Field: () => {},
  class3: initialState,
  dispatchClass3Field: () => {},
  spec3: initialState,
  dispatchSpec3Field: () => {},
  salesInterest: false,
  setSalesInterest: () => {},
  otherGamesInterest: false,
  setOtherGamesInterest: () => {},
  movieNightInterest: false,
  setMovieNightInterest: () => {},
  otherEventsComment: initialState,
  dispatchOtherEventsComment: () => {},
  recruitInterest: false,
  setRecruitInterest: () => {},
  recruitInterestComment: initialState,
  dispatchRecruitInterestComment: () => {},
  salesLeadershipInterest: false,
  setsalesLeadershipInterest: () => {},
  salesLeadershipInterestComment: initialState,
  dispatchsalesLeadershipInterestComment: () => {},
  additionComments: initialState,
  dispatchAdditionComments: () => {},

  isYearly: false,
  setIsYearly: () => {},
  selectedPlan: null as any,
  setSelectedPlan: () => {},
  addOns: [],
  setAddOns: () => {},
  clearForm: () => {},
} as FormContextData);

export const ACTIONS = {
  SET_VALUE: "SET_VALUE",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

function handleFormState(state: Field, action: any) {
  switch (action.type) {
    case ACTIONS.SET_VALUE:
      return {
        ...state,
        value: action.value,
        hasError: false,
        errorMessage: "",
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        hasError: true,
        errorMessage: action.errorMessage,
      };
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: "",
        hasError: false,
      };
    default:
      return state;
  }
}

export type Plan = {
  name: string;
  price: number;
};

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  // Player
  const [nameField, dispatchNameField] = useReducer(
    handleFormState,
    initialState
  );

  // Characters
  const [role1, dispatchRole1Field] = useReducer(handleFormState, initialState);
  const [class1, dispatchClass1Field] = useReducer(
    handleFormState,
    initialState
  );
  const [spec1, dispatchSpec1Field] = useReducer(handleFormState, initialState);
  const [role2, dispatchRole2Field] = useReducer(handleFormState, initialState);
  const [class2, dispatchClass2Field] = useReducer(
    handleFormState,
    initialState
  );
  const [spec2, dispatchSpec2Field] = useReducer(handleFormState, initialState);
  const [role3, dispatchRole3Field] = useReducer(handleFormState, initialState);
  const [class3, dispatchClass3Field] = useReducer(
    handleFormState,
    initialState
  );
  const [spec3, dispatchSpec3Field] = useReducer(handleFormState, initialState);

  // Sales & Events
  const [salesInterest, setSalesInterest] = useState<boolean>(false);
  const [otherGamesInterest, setOtherGamesInterest] = useState<boolean>(false);
  const [movieNightInterest, setMovieNightInterest] = useState<boolean>(false);
  const [otherEventsComment, dispatchOtherEventsComment] = useReducer(
    handleFormState,
    initialState
  );

  // Leadership
  const [recruitInterest, setRecruitInterest] = useState<boolean>(false);
  const [recruitInterestComment, dispatchRecruitInterestComment] = useReducer(
    handleFormState,
    initialState
  );
  const [salesLeadershipInterest, setsalesLeadershipInterest] =
    useState<boolean>(false);
  const [
    salesLeadershipInterestComment,
    dispatchsalesLeadershipInterestComment,
  ] = useReducer(handleFormState, initialState);

  // Comments
  const [additionComments, dispatchAdditionComments] = useReducer(
    handleFormState,
    initialState
  );

  const { getValueFromLocalStorage, removeValueFromLocalStorage } =
    useLocalStorage();

  function clearForm() {
    removeValueFromLocalStorage("formPlayer");
    removeValueFromLocalStorage("formCharacters");
    removeValueFromLocalStorage("formSalesEvents");
    removeValueFromLocalStorage("formLeadership");
    removeValueFromLocalStorage("formComments");

    dispatchNameField({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchRole1Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchClass1Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchSpec1Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchRole2Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchClass2Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchSpec2Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchRole3Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchClass3Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchSpec3Field({ type: ACTIONS.SET_VALUE, value: "" });
    setSalesInterest(false);
    setOtherGamesInterest(false);
    setMovieNightInterest(false);
    setRecruitInterest(false);
    dispatchRecruitInterestComment({ type: ACTIONS.SET_VALUE, value: "" });
    setsalesLeadershipInterest(false);
    dispatchsalesLeadershipInterestComment({
      type: ACTIONS.SET_VALUE,
      value: "",
    });
    dispatchOtherEventsComment({ type: ACTIONS.SET_VALUE, value: "" });
  }

  useEffect(() => {
    const playerInfoFromLocalStorage = getValueFromLocalStorage("formPlayer");
    if (playerInfoFromLocalStorage) {
      dispatchNameField({
        type: ACTIONS.SET_VALUE,
        value: playerInfoFromLocalStorage.name,
      });
    }

    const characterInfoFromLocalStorage =
      getValueFromLocalStorage("formCharacters");
    if (characterInfoFromLocalStorage) {
      dispatchRole1Field({
        type: ACTIONS.SET_VALUE,
        value: characterInfoFromLocalStorage.role1,
      });
      dispatchClass1Field({
        type: ACTIONS.SET_VALUE,
        value: characterInfoFromLocalStorage.class1,
      });
      dispatchSpec1Field({
        type: ACTIONS.SET_VALUE,
        value: characterInfoFromLocalStorage.spec1,
      });
      dispatchRole2Field({
        type: ACTIONS.SET_VALUE,
        value: characterInfoFromLocalStorage.role2,
      });
      dispatchClass2Field({
        type: ACTIONS.SET_VALUE,
        value: characterInfoFromLocalStorage.class2,
      });
      dispatchSpec2Field({
        type: ACTIONS.SET_VALUE,
        value: characterInfoFromLocalStorage.spec2,
      });
      dispatchRole3Field({
        type: ACTIONS.SET_VALUE,
        value: characterInfoFromLocalStorage.role3,
      });
      dispatchClass3Field({
        type: ACTIONS.SET_VALUE,
        value: characterInfoFromLocalStorage.class3,
      });
      dispatchSpec3Field({
        type: ACTIONS.SET_VALUE,
        value: characterInfoFromLocalStorage.spec3,
      });
    }

    const salesEventsInfoFromLocalStorage =
      getValueFromLocalStorage("formSalesEvents");
    if (salesEventsInfoFromLocalStorage) {
      setSalesInterest(salesEventsInfoFromLocalStorage.salesInterest);
      setOtherGamesInterest(salesEventsInfoFromLocalStorage.otherGamesInterest);
      setMovieNightInterest(salesEventsInfoFromLocalStorage.movieNightInterest);
      dispatchOtherEventsComment({
        type: ACTIONS.SET_VALUE,
        value: salesEventsInfoFromLocalStorage.otherEventsComment,
      });
    }

    const leadershipInfoFromLocalStorage =
      getValueFromLocalStorage("formLeadership");
    if (leadershipInfoFromLocalStorage) {
      setRecruitInterest(leadershipInfoFromLocalStorage.recruitInterest);
      dispatchRecruitInterestComment({
        type: ACTIONS.SET_VALUE,
        value: leadershipInfoFromLocalStorage.recruitInterestComment,
      });
      setsalesLeadershipInterest(
        leadershipInfoFromLocalStorage.salesLeadershipInterest
      );
      dispatchsalesLeadershipInterestComment({
        type: ACTIONS.SET_VALUE,
        value: leadershipInfoFromLocalStorage.salesLeadershipInterestComment,
      });
    }

    const commentsInfoFromLocalStorage =
      getValueFromLocalStorage("formComments");
    if (commentsInfoFromLocalStorage) {
      dispatchAdditionComments({
        type: ACTIONS.SET_VALUE,
        value: commentsInfoFromLocalStorage.additionComments,
      });
    }
  }, []);

  const value = {
    nameField,
    dispatchNameField,
    role1,
    dispatchRole1Field,
    class1,
    dispatchClass1Field,
    spec1,
    dispatchSpec1Field,
    role2,
    dispatchRole2Field,
    class2,
    dispatchClass2Field,
    spec2,
    dispatchSpec2Field,
    role3,
    dispatchRole3Field,
    class3,
    dispatchClass3Field,
    spec3,
    dispatchSpec3Field,
    salesInterest,
    setSalesInterest,
    otherGamesInterest,
    setOtherGamesInterest,
    movieNightInterest,
    setMovieNightInterest,
    otherEventsComment,
    dispatchOtherEventsComment,
    recruitInterest,
    setRecruitInterest,
    recruitInterestComment,
    dispatchRecruitInterestComment,
    salesLeadershipInterest,
    setsalesLeadershipInterest,
    salesLeadershipInterestComment,
    dispatchsalesLeadershipInterestComment,
    additionComments,
    dispatchAdditionComments,
    clearForm,
  };

  return (
    <FormContext.Provider value={{ ...value }}>{children}</FormContext.Provider>
  );
};
