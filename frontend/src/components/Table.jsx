

const Table = ({ generateHead, generateRows }) => {


    return (
        <table className="min-w-full bg-gray-200 my-6 rounded-t-2xl">
            <thead>
                <tr>
                    {generateHead}
                    <th className="py-2 px-4 border-r border-gray-100">Action</th>
                </tr>
            </thead>
            <tbody className="bg-white">

                {generateRows}




            </tbody>
        </table>
    )
}

export default Table