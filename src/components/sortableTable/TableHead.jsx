import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

const TableHead = ({ columns, handleSorting }) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (label) => {
        const sortOrder =
         label === sortField && order === "asc" ? "desc" : "asc";
        setSortField(label);
        setOrder(sortOrder);
        handleSorting(label, sortOrder);
       };

    return (
     <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
            return (
          <th
            key={accessor}
            onClick={sortable ? () => handleSortingChange(label) : null}
            >
            
                <div className="text-icon">
                    {label}
                    {sortable ? (
                        label === sortField && order === "asc" ? (
                            <ChevronUpIcon className="arrow" />
                        ) : (
                            <ChevronDownIcon className="arrow" />
                        )
                    ) : (
                        null
                    )}
                </div>
          </th>
            );
             })}
      </tr>
     </thead>
    );
   };
   
   export default TableHead;