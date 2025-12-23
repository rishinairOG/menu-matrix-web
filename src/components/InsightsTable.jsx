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
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            <div className="px-8 py-5 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h3 className="text-lg font-bold text-white">Actionable Insights</h3>
                <div className="text-xs text-gray-400 font-mono bg-black/20 px-2 py-1 rounded">
                    {data.length} ITEMS ANALYZED
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10">
                    <thead>
                        <tr className="bg-white/5">
                            <th scope="col" className="px-8 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                Item Name
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                Margin
                            </th>
                            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                Popularity
                            </th>
                            <th scope="col" className="px-8 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                AI Recommendation
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-transparent">
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-white/5 transition-colors group">
                                <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                                    {item.menu_item}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={clsx(
                                        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border shadow-sm',
                                        getCategoryStyles(item.category)
                                    )}>
                                        <span className="mr-1.5">{getCategoryIcon(item.category)}</span>
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-400 font-mono">
                                    ${item.contribution_margin?.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-400 font-mono">
                                    {item.popularity_index?.toFixed(1)}%
                                </td>
                                <td className="px-8 py-4 text-sm max-w-sm break-words whitespace-normal leading-relaxed">
                                    <div className={`flex items-start gap-2 ${getInsightStyle(item.insight)}`}>
                                        <div className="mt-1 opacity-50"><ArrowRight className="h-3 w-3" /></div>
                                        <span>{item.insight || "No recommendation available."}</span>
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
