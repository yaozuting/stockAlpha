import TableBody from "./TableBody.jsx";
import TableHead from "./TableHead.jsx";
import React, { useState, useEffect } from 'react';

const Table = ({ df, columns }) => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        // Update tableData when df changes
        if (Array.isArray(df) && df.length > 0) {
            setTableData(df);
        }
    }, [df]); // Dependency array ensures this runs only when df changes

    if (!Array.isArray(df) || df.length === 0) {
        return <p>Loading data...</p>;
    }

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            console.log(sortField);
            const sorted = [...tableData].sort((a, b) => {
                const aValue = a[sortField] !== undefined && a[sortField] !== null ? a[sortField].toString() : "";
                const bValue = b[sortField] !== undefined && b[sortField] !== null ? b[sortField].toString() : "";

                return (
                    aValue.localeCompare(bValue, "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            setTableData(sorted);
        }
    };

    return (
        <>
            <table className="table">
                <TableHead columns={columns} handleSorting={handleSorting} />
                <TableBody columns={columns} tableData={tableData} />
            </table>
        </>
    );
};

export default Table;