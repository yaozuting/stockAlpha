import React from "react";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function StockPriceChart({ data }) {
    // Check if data is available and has the required structure  
    console.log(data);
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <p>No data available</p>;
    }

    return (
        <ResponsiveContainer width="90%" height={400}>
            <ComposedChart data={data} margin={{ right: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                
                {/* Left Y-Axis for adjclose */}
                <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke="#007bff"
                    domain={["auto", "auto"]}
                    label={{ value: "Price (Close)", angle: -90, position: "insideLeft" }}
                />
                
                {/* Right Y-Axis for volume */}
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#8884d8"
                    domain={[0, "auto"]}
                    tickFormatter={(v) => `${(v).toLocaleString()}k`}
                    label={{
                        value: "Volume (/1000)",
                        angle: 90,
                        position: "outsideRight",
                        dx: 50
                    }}
                />
                
                <Tooltip
                    formatter={(value, name) => [value, name === "adjclose" ? "Price" : "Volume"]}
                />

                {/* Line Chart for adjusted close */}
                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="adjclose"
                    stroke="#007bff"
                    dot={false}
                />

                {/* Custom Bar Chart for volume with dynamic coloring */}
                <Bar
                    yAxisId="right"
                    dataKey="volume"
                    barSize={15}
                    shape={(props) => {
                        const { x, y, width, height, payload, index } = props;

                        // 👇 Hide the first bar
                        const isFirst = index === 0;

                        return (
                            <rect
                                x={x}
                                y={isFirst ? 0 : y}
                                width={width}
                                height={isFirst ? 0 : height}
                                fill={isFirst ? "transparent" : (payload.volumeColor || "#8884d8")}
                            />
                        );
                    }}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
}
