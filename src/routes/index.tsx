import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Bets from "./Bets";

const router = createBrowserRouter([
    {
        path: "f1_porra/",
        element: <Home/>,
    },
    {
        path: "f1_porra/bets",
        element: <Bets/>
    }
]);

export default router;