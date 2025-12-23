import React from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Cell,
    Label
} from 'recharts';

const MenuScatterPlot = ({ data }) => {
    // Calculate averages for the quadrant lines
    const avgMargin = data.reduce((sum, item) => sum + item.contribution_margin, 0) / data.length;
    const avgPopularity = data.reduce((sum, item) => sum + item.popularity_index, 0) / data.length;

    const COLORS = {
        'Star': '#4ade80',      // Green-400
        'Plowhorse': '#facc15', // Yellow-400
        'Puzzle': '#60a5fa',    // Blue-400
        'Dog': '#f87171'        // Red-400
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-gray-900/90 backdrop-blur-md p-4 border border-white/10 shadow-xl rounded-xl">
                    <p className="font-bold text-white mb-2">{data.menu_item}</p>
                    <div className="text-xs text-gray-300 space-y-1">
                        <div className="flex items-center justify-between gap-4">
                            <span>Category:</span>
                            <span className="font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-white/5 border border-white/10" style={{ color: COLORS[data.category] }}>
                                {data.category}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span>Profit:</span>
                            <span className="font-mono text-white">${data.contribution_margin?.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span>Popularity:</span>
                            <span className="font-mono text-white">{data.popularity_index?.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-6">Engineering Matrix</h3>
            <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{ top: 20, right: 30, bottom: 20, left: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="#ffffff" />
                        <XAxis
                            type="number"
                            dataKey="popularity_index"
                            name="Popularity"
                            stroke="#9ca3af"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            tickLine={{ stroke: '#4b5563' }}
                            label={{ value: 'Popularity %', position: 'bottom', offset: 0, fill: '#9ca3af', fontSize: 12 }}
                        />
                        <YAxis
                            type="number"
                            dataKey="contribution_margin"
                            name="Margin"
                            stroke="#9ca3af"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            tickLine={{ stroke: '#4b5563' }}
                            label={{ value: 'Profit Margin $', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />

                        {/* Quadrant Lines */}
                        <ReferenceLine x={avgPopularity} stroke="#4b5563" strokeDasharray="3 3">
                            <Label value="Avg Pop" position="insideTopRight" fill="#6b7280" fontSize={10} />
                        </ReferenceLine>
                        <ReferenceLine y={avgMargin} stroke="#4b5563" strokeDasharray="3 3">
                            <Label value="Avg Margin" position="insideRight" fill="#6b7280" fontSize={10} />
                        </ReferenceLine>

                        <Scatter name="Menu Items" data={data} fill="#8884d8">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.category] || '#9ca3af'} strokeWidth={1} stroke="rgba(255,255,255,0.2)" />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center flex-wrap gap-4 mt-6 text-sm">
                {Object.entries(COLORS).map(([name, color]) => (
                    <div key={name} className="flex items-center bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                        <span className="w-2.5 h-2.5 rounded-full mr-2 shadow-sm shadow-black/50" style={{ backgroundColor: color }}></span>
                        <span className="text-gray-300 text-xs font-medium">{name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuScatterPlot;
