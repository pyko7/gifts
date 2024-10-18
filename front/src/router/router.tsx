import { createBrowserRouter } from "react-router-dom";
import { authRouter, mainRouter } from "./index";

export const router = createBrowserRouter([...authRouter, ...mainRouter]);
