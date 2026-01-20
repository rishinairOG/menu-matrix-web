import React from 'react';
import { Star, ShoppingBag, DollarSign, AlertCircle } from 'lucide-react';

const QuadrantExplainer = () => {
    const quadrants = [
        {
            title: "Stars",
            description: "High Popularity & High Profit. These are your winners. Keep the quality consistent and promote them heavily.",
            icon: Star,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
        },
        {
            title: "Plowhorses",
            description: "High Popularity but Low Profit. Customers love them, but they cost too much. Focus on reducing portion costs or slightly raising prices.",
            icon: ShoppingBag,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
        },
        {
            title: "Puzzles",
            description: "Low Popularity but High Profit. They make good money when sold, but sales are low. Try better placement or renaming the dish.",
            icon: DollarSign,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
        },
        {
            title: "Dogs",
            description: "Low Popularity & Low Profit. These dishes are taking up space. Consider removing them from the menu or redesigning them entirely.",
            icon: AlertCircle,
            color: "text-rose-400",
            bg: "bg-rose-500/10",
            border: "border-rose-500/20",
        },
    ];

    return (
        <div className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Master Your Menu</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We use the Kasavana & Smith Matrix to analyze every item on your menu, categorizing them into four distinct quadrants.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quadrants.map((q, idx) => (
                        <div
                            key={idx}
                            className={`glass-card glass-card-hover p-8 rounded-3xl border ${q.border} animate-reveal`}
                            style={{ animationDelay: `${0.1 * idx}s` }}
                        >
                            <div className={`w-14 h-14 rounded-2xl ${q.bg} flex items-center justify-center mb-6`}>
                                <q.icon className={`h-8 w-8 ${q.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{q.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {q.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuadrantExplainer;
