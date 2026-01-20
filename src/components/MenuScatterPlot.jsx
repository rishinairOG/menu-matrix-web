import React, { useState } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    ZAxis
} from 'recharts';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

const MenuScatterPlot = ({ data }) => {
    const [zoom, setZoom] = useState(1);

    const COLORS = {
        'Star': '#10b981',      // Emerald-500
        'Plowhorse': '#f59e0b', // Amber-500
        'Puzzle': '#3b82f6',    // Blue-500
        'Dog': '#f43f5e'        // Rose-500
    };

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 0.5));
    const handleReset = () => setZoom(1);

    // Dynamic axis domains based on data and zoom
    const getDomain = (dataKey) => {
        if (!data || data.length === 0) return [0, 100];
        const values = data.map(d => d[dataKey]);
        const max = Math.max(...values);
        return [0, (max * 1.1) / zoom];
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const itemData = payload[0].payload;
            return (
                <div className="glass-card p-4 border border-white/10 shadow-2xl rounded-2xl animate-reveal">
                    <p className="font-black text-white mb-2 text-base tracking-tight">{itemData.menu_item}</p>
                    <div className="text-xs text-gray-400 space-y-1.5 font-bold uppercase tracking-widest">
                        <div className="flex items-center justify-between gap-6">
                            <span>Classification:</span>
                            <span style={{ color: COLORS[itemData.category] }}>
                                {itemData.category}
                            </span>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                            <span>Contribution:</span>
                            <span className="text-white">${itemData.contribution_margin?.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                            <span>Qty Sold:</span>
                            <span className="text-white">{itemData.sales_volume}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-card rounded-[2.5rem] p-10 border border-white/5 animate-reveal relative group" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Performance Matrix</h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Visualization of Profit vs. Popularity</p>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                    <button
                        onClick={handleZoomIn}
                        title="Zoom In"
                        className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all active:scale-90"
                    >
                        <ZoomIn size={18} />
                    </button>
                    <button
                        onClick={handleZoomOut}
                        title="Zoom Out"
                        className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all active:scale-90"
                    >
                        <ZoomOut size={18} />
                    </button>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <button
                        onClick={handleReset}
                        title="Reset View"
                        className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all active:scale-90"
                    >
                        <Maximize2 size={18} />
                    </button>
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-2">
                        {zoom === 1 ? 'Default' : `${zoom.toFixed(1)}x`}
                    </span>
                </div>
            </div>

            <div className="h-[500px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                        <XAxis
                            type="number"
                            dataKey="sales_volume"
                            name="Sold"
                            stroke="#525252"
                            fontSize={12}
                            fontWeight={700}
                            domain={getDomain('sales_volume')}
                            tickLine={false}
                            axisLine={false}
                            label={{ value: 'Quantity Sold', position: 'insideBottom', offset: -10, fill: '#737373', fontSize: 10, fontWeight: 800, textAnchor: 'middle' }}
                        />
                        <YAxis
                            type="number"
                            dataKey="contribution_margin"
                            name="Profit"
                            stroke="#525252"
                            fontSize={12}
                            fontWeight={700}
                            domain={getDomain('contribution_margin')}
                            tickLine={false}
                            axisLine={false}
                            label={{ value: 'Margin ($)', angle: -90, position: 'insideLeft', fill: '#737373', fontSize: 10, fontWeight: 800, textAnchor: 'middle' }}
                        />
                        <ZAxis type="number" range={[100, 100]} />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ strokeDasharray: '3 3', stroke: '#4f46e5', strokeWidth: 1 }}
                        />
                        <Scatter name="Menu Items" data={data}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[entry.category]}
                                    fillOpacity={0.9}
                                    className="cursor-pointer transition-all duration-300 hover:scale-125 select-none"
                                    // Remove thick white stroke, use a very subtle shadow/outer color if needed
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth={1}
                                />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            {/* Legend Indicators */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-white/5">
                {Object.entries(COLORS).map(([category, color]) => (
                    <div key={category} className="flex flex-col items-center gap-2 group/legend cursor-default">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] group-hover/legend:text-gray-300 transition-colors">
                                {category}s
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuScatterPlot;
