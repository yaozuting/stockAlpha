import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
  } from 'recharts';
  
  const CompanyBarChart = ({ data }) => {
    console.log(data)
    if (!data || data.length === 0) {
      return ;
    }
    const sortedData = [...data].sort((a, b) => b.value - a.value);
  
    return (
      <div className="graph">
        <ResponsiveContainer >
          <BarChart
            layout="vertical"
            data={sortedData}
            align ="center"
          >
            <CartesianGrid strokeDasharray="3 3" display='none' />
            <XAxis type="number" 
                display='none' />
            <YAxis dataKey="name" type="category" fontSize={13} />
            <Tooltip />
            <Bar dataKey="value" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
export default CompanyBarChart;
  