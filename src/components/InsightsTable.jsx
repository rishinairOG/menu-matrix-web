import React from 'react';
import clsx from 'clsx';
import { TrendingUp, AlertCircle, DollarSign, Star, ArrowRight } from 'lucide-react';

const InsightsTable = ({ data }) => {
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Star': return <Star className="h-3.5 w-3.5" />;
            case 'Plowhorse': return <TrendingUp className="h-3.5 w-3.5" />;
            case 'Puzzle': return <DollarSign className="h-3.5 w-3.5" />;
            case 'Dog': return <AlertCircle className="h-3.5 w-3.5" />;
            default: return null;
        }
    };

    const getCategoryStyles = (category) => {
        switch (category) {
            case 'Star': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Plowhorse': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'Puzzle': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Dog': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    const getInsightStyle = (text) => {
        if (!text) return 'text-gray-500';
        const lowerText = text.toLowerCase();

        // Return badges instead of plain text styles if possible, but for mixed text we use spans
        // Here we just return text color classes for the whole cell content
        if (lowerText.includes('remove') || lowerText.includes('eliminate')) return 'text-rose-400';
        if (lowerText.includes('promote') || lowerText.includes('highlight')) return 'text-emerald-400';
        if (lowerText.includes('price')) return 'text-amber-400';

        return 'text-gray-400';
    };

    return (
        <div className="glass-card rounded-[2.5rem] border border-white/5 overflow-hidden animate-reveal" style={{ animationDelay: '0.2s' }}>
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Strategy Table</h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Detailed item-by-item analysis and optimization guide</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {data.length} Items Analyzed
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/[0.02]">
                            <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-widest border-b border-white/5">Item Name</th>
                            <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-widest border-b border-white/5">Category</th>
                            <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-widest border-b border-white/5">Margin</th>
                            <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-widest border-b border-white/5">Sold</th>
                            <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-widest border-b border-white/5">Strategy / Recommendation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                        {data.map((item, idx) => (
                            <tr key={idx} className="group hover:bg-white/[0.03] transition-colors duration-300">
                                <td className="px-8 py-6">
                                    <div className="font-black text-white text-base tracking-tight">{item.menu_item}</div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${item.category === 'Star' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                            item.category === 'Plowhorse' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                item.category === 'Puzzle' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                    'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                        }`}>
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="text-gray-300 font-bold tabular-nums">
                                        ${item.contribution_margin.toFixed(2)}
                                    </div>
                                </td>
                                <td className="px-8 py-6 font-bold tabular-nums text-gray-400">
                                    {item.sales_volume}
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${item.category === 'Star' ? 'bg-emerald-500' :
                                                item.category === 'Plowhorse' ? 'bg-amber-500' :
                                                    item.category === 'Puzzle' ? 'bg-blue-500' :
                                                        'bg-rose-500'
                                            }`} />
                                        <p className="text-sm text-gray-400 font-medium leading-relaxed group-hover:text-gray-200 transition-colors">
                                            {item.insight}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InsightsTable;
