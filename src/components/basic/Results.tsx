import { useEffect, useState } from "react";
import {
    ConstructorStanding,
    DriverStanding,
} from "../../models/ergastTypes";
import RULES from "../../utils/rules";
import { PlayerIndex } from "../../models/Indexes";
import Result, { ConstructorPoints, DriverPoints } from "../../models/Result";
import Table from "./Table";
import data from "../../data";
import { getConstructorStandings, getDriverStandings } from "../../utils/F1data";

export default function () {
    const [drivers, setDrivers] = useState<DriverStanding[]>([]);
    const [constructors, setConstructors] = useState<ConstructorStanding[]>([]);

    useEffect(() => {
        getDriverStandings(setDrivers);
        getConstructorStandings(setConstructors);
    }, []);

    const pilotsIds = drivers
        .sort((a, b) => parseInt(a.position) - parseInt(b.position))
        .map((pilot) => pilot.Driver.driverId);
    const constractorsIds = constructors
        .sort((a, b) => parseInt(a.position) - parseInt(b.position))
        .map((constructor) => constructor.Constructor.constructorId);

    const calculatePilotPoints = (pilot: string, position: number): number => {
        const rules: number[][] = RULES.pilots.slice(0, -1) as number[][];
        var points = RULES.pilots[RULES.pilots.length - 1] as number;

        if (pilotsIds.includes(pilot)) {
            const realPostion = pilotsIds.indexOf(pilot) + 1;
            const margin =
                position - realPostion < 0
                    ? (position - realPostion) * -1
                    : position - realPostion;
            for (var i = 0; i < rules.length - 1; i++) {
                const rule = rules[i];
                if (margin <= rule[0]) {
                    points = rule[1];
                    i = rules.length;
                }
            }
            return points;
        } else {
            return points;
        }
    };

    const calculateConstructorPoints = (
        constructor: string,
        position: number
    ): number => {
        const rules: number[][] = RULES.constructors.slice(0, -1) as number[][];
        var points = RULES.constructors[
            RULES.constructors.length - 1
        ] as number;
        if (constructor !== undefined) {
            if (constractorsIds.includes(constructor)) {
                const realPostion = constractorsIds.indexOf(constructor) + 1;
                const margin =
                    position - realPostion < 0
                        ? (position - realPostion) * -1
                        : position - realPostion;
                // console.log(constructor, realPostion, position, margin)
                for (var i = 0; i < rules.length - 1; i++) {
                    const rule = rules[i];
                    if (margin <= rule[0]) {
                        points = rule[1];
                        i = rules.length;
                    }
                }
                return points;
            } else {
                return points;
            }
        } else {
            return 0;
        }
    };

    const players: PlayerIndex[] = Array.from(
        new Set(data.map((val) => val.player))
    );

    const playersResults: Result[] = players.map<Result>((player) => {
        const result: Result = {
            player,
            pointsPerDriver: data
                .filter((value) => value.player === player)
                .map<DriverPoints>((value) => {
                    return {
                        points: calculatePilotPoints(
                            value.pilot,
                            value.position
                        ),
                        driver: value.pilot,
                    };
                }),
            pointsPerConstructor: data
                .filter(
                    (value) =>
                        value.player === player &&
                        value.constructor !== undefined
                )
                .map<ConstructorPoints>((value) => {
                    return {
                        points: calculateConstructorPoints(
                            value.constructor!,
                            value.position
                        ),
                        constructor: value.constructor!,
                    };
                }),
            pointsTotalDrivers: 0,
            pointsTotalConstructor: 0,
        };
        result.pointsTotalDrivers = result.pointsPerDriver.reduce(
            (sum, value) => sum + value.points,
            0
        );
        result.pointsTotalConstructor = result.pointsPerConstructor.reduce(
            (sum, value) => sum + value.points,
            0
        );
        return result;
    });

    console.log(playersResults);

    return (
        <Table headers={["player", "constructors", "drivers"]}>
            {playersResults.map<string[]>((player) => [
                player.player,
                player.pointsTotalConstructor.toString(),
                player.pointsTotalDrivers.toString(),
            ])}
        </Table>
    );
}
