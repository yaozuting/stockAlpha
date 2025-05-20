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
            const sorted = [...tableData].sort((a, b) => {
                const clean = (val) => {
                    if (val === undefined || val === null) return "";
                    const str = val.toString().replace(/[^\d.-]/g, ""); // removes %, commas etc.
                    return isNaN(parseFloat(str)) ? str : parseFloat(str);
                };
    
                const aValue = clean(a[sortField]);
                const bValue = clean(b[sortField]);
    
                if (typeof aValue === "number" && typeof bValue === "number") {
                    return (aValue - bValue) * (sortOrder === "asc" ? 1 : -1);
                }
    
                return aValue.toString().localeCompare(bValue.toString(), "en", {
                    numeric: true,
                }) * (sortOrder === "asc" ? 1 : -1);
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
