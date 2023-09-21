import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Bets from "./Bets";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "bets",
        element: <Bets/>
    }
]);

export default router;