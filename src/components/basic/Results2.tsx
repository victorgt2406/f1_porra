import { useEffect, useState } from "react";
import results from "../../utils/results";
import Result from "../../models/Result";
import Table from "./Table";

export default function () {
    useEffect(() => {
        (async () => {
            try {
                setPlayerResults(await results());
            } catch (err) {
                console.log(err);
                setPlayerResults(undefined);
            }
        })();
    },[]);
    const [playersResults, setPlayerResults] = useState<Result[]>();

    return playersResults === undefined ? (
        <>ErgastNotLoading</>
    ) : (
        <Table headers={["player", "constructors", "drivers"]}>
            {playersResults.map<string[]>((player) => [
                player.player,
                player.pointsTotalConstructor.toString(),
                player.pointsTotalDrivers.toString(),
            ])}
        </Table>
    );
}
