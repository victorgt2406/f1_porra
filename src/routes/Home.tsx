import axios from "axios";
import data from "../data";
import { useEffect, useState } from "react";

export default function () {

    useEffect(() => {
        const getStandings = async () => {
            try {
                const standings = await axios.get("http://ergast.com/api/f1/2023/driverStandings.json");
                console.log(standings.data);
            }
            catch (err) {
                console.log("error loading", err);
            }
        }
        getStandings();
    });
    return (
        <div>{data.map((value) => { return <div>{value.pilot}</div> })}</div>
    );
}