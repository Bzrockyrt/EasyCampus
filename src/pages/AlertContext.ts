import { createContext } from "react";

export default createContext({ setErrorMessage: () => console.log('test'), setSuccessMessage: () => undefined })