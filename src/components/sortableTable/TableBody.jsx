
const TableBody = ({ tableData, columns }) => {

    return (
     <tbody>
    {tableData.map((data, rowIndex) => {
        return (
            <tr key={`row-${data.code}-${rowIndex}`}>
                <td>{rowIndex+1}</td>
                {columns.map(({ label }, colIndex) => {
                    const tData = data[label];
                    const mergedString = `cell-${data.code}-${label}-${colIndex}`;
                    return <td key={mergedString}>
                        {typeof tData === 'number' ? (tData).toLocaleString('en-us') : tData}
                    </td>;
                })}
            </tr>
        );
      })}
     </tbody>
    );
   };
   
export default TableBody;
