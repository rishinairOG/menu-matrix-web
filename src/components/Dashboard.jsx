import React, { useState } from 'react';
import MenuScatterPlot from './MenuScatterPlot';
import InsightsTable from './InsightsTable';
import { DollarSign, Star, AlertCircle, ShoppingBag, RotateCcw, TrendingUp, Sparkles } from 'lucide-react';

const Dashboard = ({ analysisResult, onReset }) => {
    const { data: rawData, meta } = analysisResult;
    const [activeCategories, setActiveCategories] = useState(['Star', 'Plowhorse', 'Puzzle', 'Dog']);

    // Map backend keys to frontend expected keys
    const data = rawData.map(item => ({
        menu_item: item.Item,
        category: item.Category,
        contribution_margin: item.Contribution_Margin,
        sales_volume: item.Qty,
        popularity_index: item.Popularity_Percentage,
        insight: item.Actionable_Insight
    }));

    const filteredData = data.filter(item => activeCategories.includes(item.category));

    const toggleCategory = (category) => {
        setActiveCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    // Calculate summary stats
    const totalItems = data.length;
    const starCount = data.filter(i => i.category === 'Star').length;
    const plowhorseCount = data.filter(i => i.category === 'Plowhorse').length;
    const puzzleCount = data.filter(i => i.category === 'Puzzle').length;
    const dogCount = data.filter(i => i.category === 'Dog').length;
    const totalProfit = data.reduce((sum, i) => sum + (i.contribution_margin * i.sales_volume), 0);

    // AI Model Confidence
    const confidenceScore = meta?.clustering_quality_score || 0;
    const confidenceMsg = meta?.clustering_quality_message || "N/A";
    const isHighConfidence = confidenceScore > 0.5;

    const StatCard = ({ title, value, subtext, icon: Icon, colorClass, borderClass, accentColor, onClick, isActive = true }) => (
        <div
            onClick={onClick}
            className={`glass-card p-6 rounded-3xl border transition-all duration-500 hover:scale-[1.02] group relative overflow-hidden cursor-pointer ${borderClass || 'border-white/5'} ${!isActive ? 'opacity-40 grayscale-[0.5]' : ''}`}
        >
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] -mr-16 -mt-16 opacity-20 ${accentColor}`} />

            <div className="flex items-start justify-between relative z-10">
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{title}</p>
                    <p className="text-4xl font-black text-white mt-1 tabular-nums">{value}</p>
                    {subtext && (
                        <div className="flex items-center gap-1.5 mt-3 px-2 py-1 rounded-lg bg-white/5 border border-white/5 w-fit">
                            <TrendingUp className="h-3 w-3 text-indigo-400" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{subtext}</span>
                        </div>
                    )}
                </div>
                <div className={`p-3.5 rounded-2xl ${colorClass} bg-opacity-10 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-black/20`}>
                    <Icon className={`h-6 w-6 ${colorClass.replace('bg-', 'text-')}`} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-10 animate-reveal">

            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center glass-card p-8 rounded-[2.5rem] border border-white/5 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Intelligence Report</h1>
                    <p className="text-gray-400 mt-1">AI-powered menu engineering analysis</p>
                </div>
                <button
                    onClick={onReset}
                    className="flex items-center space-x-3 px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-gray-300 hover:text-white transition-all hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <RotateCcw className="h-4 w-4" />
                    <span>Analyze New Data</span>
                </button>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Estimated Profit"
                    value={`$${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    icon={DollarSign}
                    colorClass="bg-indigo-500"
                    accentColor="bg-indigo-500"
                    borderClass="border-indigo-500/20 shadow-2xl shadow-indigo-950/20"
                />
                <StatCard
                    title="Menu Items"
                    value={totalItems}
                    icon={ShoppingBag}
                    colorClass="bg-purple-500"
                    accentColor="bg-purple-500"
                />
                <StatCard
                    title="Model Accuracy"
                    value={`${(confidenceScore * 100).toFixed(0)}%`}
                    subtext={confidenceMsg}
                    icon={Sparkles}
                    colorClass={isHighConfidence ? "bg-emerald-500" : "bg-amber-500"}
                    accentColor={isHighConfidence ? "bg-emerald-500" : "bg-amber-500"}
                    borderClass={isHighConfidence ? "border-emerald-500/20" : "border-amber-500/20"}
                />
            </div>

            {/* Quadrant Breakdown Title */}
            <div className="pt-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
                    <div>
                        <h3 className="text-xs font-black text-gray-600 uppercase tracking-[0.3em] mb-1 ml-1 text-center sm:text-left">Quadrant Distribution</h3>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider ml-1">Click cards to filter the view</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Stars"
                        value={starCount}
                        icon={Star}
                        colorClass="bg-emerald-500"
                        accentColor="bg-emerald-500"
                        onClick={() => toggleCategory('Star')}
                        isActive={activeCategories.includes('Star')}
                    />
                    <StatCard
                        title="Plowhorses"
                        value={plowhorseCount}
                        icon={ShoppingBag}
                        colorClass="bg-amber-500"
                        accentColor="bg-amber-500"
                        onClick={() => toggleCategory('Plowhorse')}
                        isActive={activeCategories.includes('Plowhorse')}
                    />
                    <StatCard
                        title="Puzzles"
                        value={puzzleCount}
                        icon={DollarSign}
                        colorClass="bg-blue-500"
                        accentColor="bg-blue-500"
                        onClick={() => toggleCategory('Puzzle')}
                        isActive={activeCategories.includes('Puzzle')}
                    />
                    <StatCard
                        title="Dogs"
                        value={dogCount}
                        icon={AlertCircle}
                        colorClass="bg-rose-500"
                        accentColor="bg-rose-500"
                        onClick={() => toggleCategory('Dog')}
                        isActive={activeCategories.includes('Dog')}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
                {/* Charts & Tables */}
                <MenuScatterPlot data={filteredData} activeCategories={activeCategories} toggleCategory={toggleCategory} />
                <InsightsTable data={filteredData} />
            </div>
        </div>
    );
};

export default Dashboard;
