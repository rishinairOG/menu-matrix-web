import React from 'react';
import MenuScatterPlot from './MenuScatterPlot';
import InsightsTable from './InsightsTable';
import { DollarSign, Star, AlertCircle, ShoppingBag, RotateCcw, TrendingUp } from 'lucide-react';

const Dashboard = ({ analysisResult, onReset }) => {
    const { data: rawData, meta } = analysisResult;

    // Map backend keys to frontend expected keys
    const data = rawData.map(item => ({
        menu_item: item.Item,
        category: item.Category,
        contribution_margin: item.Contribution_Margin,
        sales_volume: item.Qty,
        popularity_index: item.Popularity_Percentage,
        insight: item.Actionable_Insight
    }));

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

    const StatCard = ({ title, value, subtext, icon: Icon, colorClass, borderClass }) => (
        <div className={`bg-white/5 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:bg-white/10 group ${borderClass || 'border-white/10'}`}>
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${colorClass} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${colorClass.replace('bg-', 'text-')}`} />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-400">{title}</p>
                    <p className="text-3xl font-bold text-white mt-1">{value}</p>
                    {subtext && <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {subtext}
                    </p>}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Header Actions */}
            <div className="flex justify-between items-center bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                <button
                    onClick={onReset}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 hover:border-white/20"
                >
                    <RotateCcw className="h-4 w-4" />
                    <span>Upload New Menu</span>
                </button>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Profit"
                    value={`$${totalProfit.toLocaleString()}`}
                    icon={DollarSign}
                    colorClass="bg-indigo-500"
                    borderClass="border-indigo-500/20 shadow-lg shadow-indigo-900/20"
                />
                <StatCard
                    title="Total Items"
                    value={totalItems}
                    icon={ShoppingBag}
                    colorClass="bg-violet-500"
                    borderClass="border-violet-500/20"
                />
                <StatCard
                    title="AI Model Confidence"
                    value={confidenceScore.toFixed(2)}
                    subtext={confidenceMsg}
                    icon={Star}
                    colorClass={isHighConfidence ? "bg-emerald-500" : "bg-amber-500"}
                    borderClass={isHighConfidence ? "border-emerald-500/20 shadow-lg shadow-emerald-900/20" : "border-amber-500/20 shadow-lg shadow-amber-900/20"}
                />
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Stars"
                    value={starCount}
                    icon={Star}
                    colorClass="bg-emerald-500"
                />
                <StatCard
                    title="Plowhorses"
                    value={plowhorseCount}
                    icon={ShoppingBag}
                    colorClass="bg-amber-500"
                />
                <StatCard
                    title="Puzzles"
                    value={puzzleCount}
                    icon={DollarSign}
                    colorClass="bg-blue-500"
                />
                <StatCard
                    title="Dogs"
                    value={dogCount}
                    icon={AlertCircle}
                    colorClass="bg-rose-500"
                />
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Charts & Tables */}
                <MenuScatterPlot data={data} />
                <InsightsTable data={data} />
            </div>

        </div>
    );
};

export default Dashboard;
