import axios from "axios";
import { MRData } from "../models/ergastTypes";

const getDriverStandings = async (setDrivers: any) => {
    try {
        // "https://ergast.com/api/f1/2023/4/driverStandings.json" drivers standing de la carrera 4
        const res = await axios.get(
            "https://ergast.com/api/f1/2023/driverStandings.json"
        );
        const data: MRData = res.data.MRData;
        setDrivers(data.StandingsTable.StandingsLists[0].DriverStandings);
    } catch (err) {
        console.log("error loading", err);
    }
};

const getConstructorStandings = async (setConstructors: any) => {
    try {
        const res = await axios.get(
            "https://ergast.com/api/f1/2023/constructorStandings.json"
        );
        console.log(res);
        const data: MRData = res.data.MRData;
        setConstructors(
            data.StandingsTable.StandingsLists[0].ConstructorStandings
        );
    } catch (err) {
        console.log("error loading", err);
    }
};

export { getDriverStandings, getConstructorStandings };
