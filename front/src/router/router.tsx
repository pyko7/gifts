import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "./authRouter";

export const router = createBrowserRouter([...authRouter]);
