import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Upload, Activity, Sparkles } from 'lucide-react';

const FileUpload = ({ onDataReceived }) => {
    const [file, setFile] = useState(null);
    const [availableColumns, setAvailableColumns] = useState([]);
    const [colItem, setColItem] = useState('');
    const [colCost, setColCost] = useState('');
    const [colPrice, setColPrice] = useState('');
    const [colQty, setColQty] = useState('');
    const [duration, setDuration] = useState(30);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

            // Handle Excel files (.xlsx, .xls)
            if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = new Uint8Array(event.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });

                    // Get first sheet
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];

                    // Convert to JSON to get headers
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    if (jsonData && jsonData.length > 0) {
                        const headers = jsonData[0].filter(h => h && h.toString().trim() !== '');
                        setAvailableColumns(headers);

                        // Auto-select if exact matches found
                        if (headers.includes('Menu Item')) setColItem('Menu Item');
                        if (headers.includes('Cost')) setColCost('Cost');
                        if (headers.includes('Price')) setColPrice('Price');
                        if (headers.includes('Sold Qty')) setColQty('Sold Qty');
                    }
                };
                reader.readAsArrayBuffer(selectedFile);
            }
            // Handle CSV files
            else {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const csvText = event.target.result;

                    // Parse the text content
                    Papa.parse(csvText, {
                        skipEmptyLines: true,
                        complete: (results) => {
                            if (results.data && results.data.length > 0) {
                                const headers = results.data[0].filter(h => h && h.trim() !== '');
                                setAvailableColumns(headers);

                                // Auto-select if exact matches found
                                if (headers.includes('Menu Item')) setColItem('Menu Item');
                                if (headers.includes('Cost')) setColCost('Cost');
                                if (headers.includes('Price')) setColPrice('Price');
                                if (headers.includes('Sold Qty')) setColQty('Sold Qty');
                            }
                        }
                    });
                };

                // Read as text with UTF-8 encoding
                reader.readAsText(selectedFile, 'UTF-8');
            }
        }
    };

    const handleDemoData = () => {
        const demoCSV = `Menu Item,Cost,Price,Sold Qty
Truffle Burger,4.50,16.00,120
Cheese Pizza,3.00,12.00,350
Lobster Ravioli,9.00,28.00,15
Caesar Salad,2.50,11.00,45
Soda,0.20,3.00,500
Wagyu Steak,25.00,65.00,40
Fried Calamari,5.00,14.00,90
Vegan Wrap,3.50,10.00,25`;

        // Create a Blob from the demo CSV
        const blob = new Blob([demoCSV], { type: 'text/csv' });
        const demoFile = new File([blob], 'demo_menu.csv', { type: 'text/csv' });

        setFile(demoFile);

        // Parse to get headers
        Papa.parse(demoFile, {
            preview: 10,
            complete: (results) => {
                if (results.data && results.data.length > 0) {
                    const headers = results.data[0];
                    setAvailableColumns(headers);

                    // Set column mappings
                    const itemCol = 'Menu Item';
                    const costCol = 'Cost';
                    const priceCol = 'Price';
                    const qtyCol = 'Sold Qty';

                    setColItem(itemCol);
                    setColCost(costCol);
                    setColPrice(priceCol);
                    setColQty(qtyCol);

                    // Auto-trigger analysis with explicit column mappings
                    setTimeout(() => {
                        handleAnalyzeWithColumns(demoFile, itemCol, costCol, priceCol, qtyCol);
                    }, 500);
                }
            }
        });
    };

    const handleAnalyzeWithColumns = async (fileToAnalyze, item, cost, price, qty) => {
        if (!fileToAnalyze) {
            alert("Please select a file first.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', fileToAnalyze);
        formData.append('col_item', item);
        formData.append('col_cost', cost);
        formData.append('col_price', price);
        formData.append('col_qty', qty);
        formData.append('duration', duration);

        try {
            const response = await axios.post('https://menu-matrix-api-406598298206.us-central1.run.app/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Analysis Result:', response.data);
            if (onDataReceived) {
                onDataReceived(response.data);
            }
        } catch (error) {
            console.error('Error analyzing menu:', error);
            alert('Error analyzing menu. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyzeWithFile = async (fileToAnalyze = file) => {
        if (!fileToAnalyze) {
            alert("Please select a file first.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', fileToAnalyze);
            formData.append('col_item', colItem);
            formData.append('col_cost', colCost);
            formData.append('col_price', colPrice);
            formData.append('col_qty', colQty);
            formData.append('duration', duration);

            const response = await axios.post('https://menu-matrix-api-406598298206.us-central1.run.app/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Analysis Result:', response.data);
            if (onDataReceived) {
                onDataReceived(response.data);
            }
        } catch (error) {
            console.error('Error analyzing menu:', error);
            alert('Error analyzing menu. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyze = () => handleAnalyzeWithFile();

    return (
        <div className="max-w-xl mx-auto mt-20">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                {/* Glow Effect */}
                <div className="absolute top-0 -left-1/2 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-shine pointer-events-none" />

                <div className="flex items-center space-x-3 mb-2">
                    <Activity className="h-6 w-6 text-indigo-400" />
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Upload Menu Data
                    </h2>
                </div>

                <p className="text-gray-400 mb-8 ml-9 text-sm">
                    Upload your sales data to generate AI-powered insights.
                </p>

                <div className="space-y-6 relative z-10">
                    {/* File Input */}
                    <div className="relative">
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            className="sr-only"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="file-upload"
                            className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer ${file
                                ? 'border-indigo-500/50 bg-indigo-500/10'
                                : 'border-white/10 hover:border-indigo-400/50 hover:bg-white/5'
                                }`}
                        >
                            <div className={`p-4 rounded-full mb-4 transition-all duration-300 ${file ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/5 text-gray-400'
                                }`}>
                                <Upload className="h-8 w-8" />
                            </div>
                            <p className="text-sm font-medium text-gray-200">
                                {file ? file.name : "Upload CSV or Excel file"}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                Drag and drop or click to select
                            </p>
                        </label>
                    </div>

                    {/* Demo Data Button */}
                    <div className="flex items-center justify-center">
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <div className="h-px flex-1 bg-white/10"></div>
                            <span>OR</span>
                            <div className="h-px flex-1 bg-white/10"></div>
                        </div>
                    </div>

                    <button
                        onClick={handleDemoData}
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-xl text-sm font-medium text-gray-300 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Sparkles className="h-4 w-4" />
                        <span>Use Demo Data</span>
                    </button>

                    {/* Column Mapping Dropdowns - shown only after file selection */}
                    {file && availableColumns.length > 0 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Item Name Column</label>
                                    <select
                                        value={colItem}
                                        onChange={(e) => setColItem(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                                    >
                                        <option value="" className="bg-gray-800 text-gray-200">Select column...</option>
                                        {availableColumns.map((col, idx) => (
                                            <option key={idx} value={col} className="bg-gray-800 text-gray-200">{col}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Cost Column</label>
                                    <select
                                        value={colCost}
                                        onChange={(e) => setColCost(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                                    >
                                        <option value="" className="bg-gray-800 text-gray-200">Select column...</option>
                                        {availableColumns.map((col, idx) => (
                                            <option key={idx} value={col} className="bg-gray-800 text-gray-200">{col}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Price Column</label>
                                    <select
                                        value={colPrice}
                                        onChange={(e) => setColPrice(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                                    >
                                        <option value="" className="bg-gray-800 text-gray-200">Select column...</option>
                                        {availableColumns.map((col, idx) => (
                                            <option key={idx} value={col} className="bg-gray-800 text-gray-200">{col}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Quantity Column</label>
                                    <select
                                        value={colQty}
                                        onChange={(e) => setColQty(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                                    >
                                        <option value="" className="bg-gray-800 text-gray-200">Select column...</option>
                                        {availableColumns.map((col, idx) => (
                                            <option key={idx} value={col} className="bg-gray-800 text-gray-200">{col}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1">Data Duration (Days)</label>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                                />
                            </div>

                            <button
                                onClick={handleAnalyze}
                                disabled={loading}
                                className={`w-full py-3 px-4 rounded-xl text-sm font-bold text-white shadow-lg transition-all duration-300 ${loading
                                    ? 'bg-indigo-900/50 cursor-wait'
                                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/25 hover:-translate-y-0.5'
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Activity className="h-4 w-4 animate-pulse text-indigo-300" />
                                        <span>AI is analyzing your menu...</span>
                                    </div>
                                ) : (
                                    'Run Analysis'
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
