import axios from "axios";
import data from "../data";
import { useEffect, useState } from "react";
import RULES from "../utils/rules";

interface Constructor {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
}

interface ConstructorStanding {
    Constructor: Constructor;
    points: string;
    position: string;
    positionText: string;
    wins: string;
}

type Driver = {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
};

type DriverStanding = {
    Constructors: any[]; // Ajusta este tipo según tus necesidades
    Driver: Driver;
    points: string;
    position: string;
    positionText: string;
    wins: string;
};

type StandingsList = {
    DriverStandings: DriverStanding[],
    ConstructorStandings: ConstructorStanding[]
    round: string;
    season: string;
};

type StandingsTable = {
    StandingsLists: StandingsList[];
    season: string;
};

type MRData = {
    StandingsTable: StandingsTable;
    limit: string;
    offset: string;
    series: string;
    total: string;
    url: string;
    xmlns: string;
};

export default function () {
    const [pilots, setPilots] = useState<DriverStanding[]>([]);
    const [constructors, setConstructors] = useState<ConstructorStanding[]>([]);

    useEffect(() => {
        const getPilotStandings = async () => {
            try {
                const res = await axios.get("https://ergast.com/api/f1/2023/driverStandings.json");
                const data: MRData = res.data.MRData;
                setPilots(data.StandingsTable.StandingsLists[0].DriverStandings);
            }
            catch (err) {
                console.log("error loading", err);
            }
        }

        const getConstructorStandings = async () => {
            try {
                const res = await axios.get("https://ergast.com/api/f1/2023/constructorStandings.json");
                console.log(res);
                const data: MRData = res.data.MRData;
                setConstructors(data.StandingsTable.StandingsLists[0].ConstructorStandings);
            }
            catch (err) {
                console.log("error loading", err);
            }
        }
        getPilotStandings();
        getConstructorStandings();
    }, []);


    const pilotsIds = pilots.sort((a, b) => parseInt(a.position) - parseInt(b.position)).map((pilot) => pilot.Driver.driverId);
    const constractorsIds = constructors.sort((a, b) => parseInt(a.position) - parseInt(b.position)).map((constructor) => constructor.Constructor.constructorId);

    const calculatePilotPoints = (pilot: string, position: number): number => {
        const rules: number[][] = (RULES.pilots.slice(0, -1) as number[][]);
        var points = RULES.pilots[RULES.pilots.length - 1] as number;

        if (pilotsIds.includes(pilot)) {
            const realPostion = (pilotsIds.indexOf(pilot)) + 1;
            const margin = ((position - realPostion) < 0) ? ((position - realPostion) * -1) : (position - realPostion);
            for (var i = 0; i < rules.length - 1; i++) {
                const rule = rules[i];
                if (margin <= rule[0]) {
                    points = rule[1];
                    i = rules.length
                }
            }
            return points;
        }

        else {
            return points;
        }
    }

    const calculateConstructorPoints = (position: number, constructor?: string): number => {
        const rules: number[][] = (RULES.constructors.slice(0, -1) as number[][]);
        var points = RULES.constructors[RULES.constructors.length - 1] as number;
        if (constructor !== undefined) {
            if (constractorsIds.includes(constructor)) {
                const realPostion = (constractorsIds.indexOf(constructor)) + 1;
                const margin = ((position - realPostion) < 0) ? ((position - realPostion) * -1) : (position - realPostion);
                // console.log(constructor, realPostion, position, margin)
                for (var i = 0; i < rules.length - 1; i++) {
                    const rule = rules[i];
                    if (margin <= rule[0]) {
                        points = rule[1];
                        i = rules.length
                    }
                }
                return points;
            }

            else {
                return points;
            }
        }
        else {
            return 0;
        }

    }


    const players: string[] = data.reduce((vals: string[], val) => {
        return vals.includes(val.player) ? [...vals] : [...vals, val.player]
    }, []);
    const playersPorra: any = players.map((player) => [player, data.filter((value) => value.player === player)
        .map((value) => [[value.constructor, calculateConstructorPoints(value.position, value.constructor)], [value.pilot, calculatePilotPoints(value.pilot, value.position)]])]);
    console.log(playersPorra);
    // @ts-ignore
    const playersResults: any = playersPorra.map((player) => [player[0], player[1].reduce((sum,res)=>[sum[0]+res[0][1],sum[1]+res[1][1]],[0,0])])
    console.log(playersResults);

    return (
        <div>{pilotsIds.map((value, index) => { return <div key={value}>{index + 1}{value}</div> })}</div>
    );
}