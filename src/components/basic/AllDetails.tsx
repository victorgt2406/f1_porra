import { useEffect, useState } from "react";
import results from "../../utils/results";
import Result from "../../models/Result";
import Table from "./Table";
import { ConstructorStanding, DriverStanding } from "../../models/ergastTypes";
import {
    getConstructorStandings2 as getConstructorStandings,
    getDriverStandings2 as getDriverStandings,
} from "../../utils/F1data";

export default function () {
    const [playersResults, setPlayerResults] = useState<Result[]>();
    const [drivers, setDrivers] = useState<DriverStanding[]>();
    const [constructor, setConstructors] = useState<ConstructorStanding[]>();
    const [allDetails, setAllDetails] = useState<string[][]>();
    useEffect(() => {
        (async () => {
            try {
                const res = await results();
                setPlayerResults(res);
                const dri = await getDriverStandings();
                setDrivers(dri);
                const cons = await getConstructorStandings();
                setConstructors(cons);
                // console.log(cons);
                setAllDetails(
                    dri.map((value, index) => [
                        (index<cons.length)?cons[index].Constructor.constructorId:"",
                        ...res.map(
                            (value) =>
                            (index<value.pointsPerConstructor.length)?`${value.pointsPerConstructor[index].constructor}\t${value.pointsPerConstructor[index].points}`:""
                        ),
                        value.Driver.driverId,
                        ...res.map(
                            (value) =>
                            (index<value.pointsPerDriver.length)?`${value.pointsPerDriver[index].driver}\t${value.pointsPerDriver[index].points}`:""
                        ),
                    ])
                );
            } catch (err) {
                console.log(err);
                setPlayerResults(undefined);
                setDrivers([]);
                setConstructors([]);
            }
        })();
    }, []);

    return playersResults === undefined || allDetails === undefined ? (
        <>ErgastNotLoading</>
    ) : (
        <Table
            headers={[
                "CONSTRUCTORS",
                ...playersResults.map((value) => value.player),
                "DRIVERS",
                ...playersResults.map((value) => value.player),
            ]}
        >
            {allDetails}
        </Table>
    );
}
