import data from "../data";

export default function () {
    return (
        <div>{ data.map((value)=>{return <div>{value.pilot}</div>}) }</div>
    );
}