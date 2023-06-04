export default function ({children:data,headers}:{children: string[][], headers?: string[]}) {
    return (
        <table className="table">
            {!headers ? (
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
            ) : (
                <tr>
                    {headers.map((column, index)=><th key={"header_"+index}>{column}</th>)}
                </tr>
            )}
            <tbody>
                {data.map((columns, index) => (
                    <tr key={"row_" + index}>
                        {columns.map((column, index) => (
                            <td key={"col_" + index}>{column}</td>
                        ))}
                    </tr>
                ))}
                {/* <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                </tr> */}
            </tbody>
        </table>
    );
}
