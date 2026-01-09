import React, { useState } from 'react';
import {
    Home, TrendingUp, MapPin, Phone, ExternalLink, ChevronDown, ChevronUp,
    CheckSquare, Square, Building, Wrench, Calculator, FileText, Users,
    RotateCcw, Edit3, Save, AlertTriangle, DollarSign, PieChart, List,
    ShieldAlert, Info, ArrowRight
} from 'lucide-react';

export default function DutchessInvestmentReport() {
    const [activeSection, setActiveSection] = useState('summary');
    const [checklist, setChecklist] = useState({});
    const [isEditingReno, setIsEditingReno] = useState(false);
    const [roiMode, setRoiMode] = useState('cash'); // 'cash' or 'leveraged'

    const toggleCheck = (id) => setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
    const formatCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

    const defaultRenoCosts = {
        hp_hvac: 24000, hp_electrical: 7820, hp_panels: 6000, hp_plumbing: 4888, hp_waterHeaters: 3000,
        hp_roof: 15000, hp_foundation: 5000, hp_windows: 7200, hp_siding: 8000, hp_doors: 3600,
        hp_kitchens: 50000, hp_bathrooms: 30000, hp_flooring: 15640, hp_drywall: 5865, hp_painting: 3910, hp_trim: 5000, hp_fixtures: 3000,
        hp_permits: 3000, hp_architect: 5000, hp_cleanup: 3500,
        st_hvac: 24000, st_electrical: 10336, st_panels: 6000, st_plumbing: 6460, st_waterHeaters: 3000,
        st_roof: 0, st_foundation: 5000, st_windows: 9000, st_siding: 8000, st_doors: 4800,
        st_kitchens: 50000, st_bathrooms: 30000, st_flooring: 20672, st_drywall: 7752, st_painting: 5168, st_trim: 5000, st_fixtures: 3000,
        st_permits: 3000, st_architect: 5000, st_cleanup: 3500,
        contingencyPct: 15,
    };

    const [renoCosts, setRenoCosts] = useState(defaultRenoCosts);
    const updateRenoCost = (key, value) => setRenoCosts(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));

    const calcBase = (prefix) => {
        return Object.keys(renoCosts)
            .filter(key => key.startsWith(prefix))
            .reduce((sum, key) => sum + renoCosts[key], 0);
    };

    const hpBase = calcBase('hp');
    const hpTotal = hpBase * (1 + renoCosts.contingencyPct / 100);
    const stBase = calcBase('st');
    const stTotal = stBase * (1 + renoCosts.contingencyPct / 100);

    const sections = [
        { id: 'summary', label: 'Executive Summary', icon: FileText },
        { id: 'market', label: 'Market Analysis', icon: TrendingUp },
        { id: 'properties', label: 'Property Details', icon: Home },
        { id: 'renovation', label: 'Renovation', icon: Wrench },
        { id: 'roi', label: 'Financials & ROI', icon: Calculator },
        { id: 'livable', label: 'Livable Plan', icon: Save },
        { id: 'quadplex', label: 'Quadplex Plan', icon: Building },
        { id: 'contacts', label: 'Due Diligence', icon: CheckSquare },
    ];

    const SummarySection = () => (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="overflow-hidden rounded-lg border border-slate-200">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-700">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold">Metric</th>
                                <th className="py-3 px-4 text-left font-semibold">Hyde Park (4335 Albany)</th>
                                <th className="py-3 px-4 text-left font-semibold">Staatsburg (61 Old Post)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="py-3 px-4 text-slate-500">Asking Price</td><td className="py-3 px-4 font-medium">$174,900</td><td className="py-3 px-4 font-medium">$205,000</td></tr>
                            <tr><td className="py-3 px-4 text-slate-500">Est. Renovation</td><td className="py-3 px-4 text-amber-600">{formatCurrency(hpTotal)}</td><td className="py-3 px-4 text-amber-600">{formatCurrency(stTotal)}</td></tr>
                            <tr><td className="py-3 px-4 text-slate-500">Total All-In</td><td className="py-3 px-4 font-bold">{formatCurrency(174900 + hpTotal + 11247)}</td><td className="py-3 px-4 font-bold">{formatCurrency(205000 + stTotal + 13150)}</td></tr>
                            <tr><td className="py-3 px-4 text-slate-500">Price Per Sq Ft (All-In)</td><td className="py-3 px-4">$218</td><td className="py-3 px-4 text-emerald-600 font-bold">$178</td></tr>
                            <tr><td className="py-3 px-4 text-slate-500">Condition</td><td className="py-3 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Distressed</span></td><td className="py-3 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Gut Reno</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const MarketSection = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Dutchess County Rental Indicators</h3>
                    <p className="text-slate-600 text-sm mb-6">
                        One of the strongest rental markets in the Hudson Valley, driven by proximity to NYC (Metro-North), institutions (CIA, Marist, Vassar), and a severe supply constraint (sub-2% vacancy).
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-blue-600">$1,907</div>
                            <div className="text-xs text-slate-500 font-medium">HUD Fair Market (2BR)</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-emerald-600">~2%</div>
                            <div className="text-xs text-slate-500 font-medium">Empty Units (Vacancy)</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-purple-600">+30%</div>
                            <div className="text-xs text-slate-500 font-medium">5y Rent Growth</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-slate-800">5%</div>
                            <div className="text-xs text-slate-500 font-medium">Benchmark Vacancy</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Projected Income</h3>
                    <div className="space-y-4">
                        <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
                            <div className="text-sm font-semibold text-blue-900">Hyde Park Duplex</div>
                            <div className="text-2xl font-bold text-blue-700">$3,400 - $3,800</div>
                            <div className="text-xs text-blue-600">Monthly Gross Rent</div>
                        </div>
                        <div className="p-4 border border-emerald-100 bg-emerald-50 rounded-lg">
                            <div className="text-sm font-semibold text-emerald-900">Staatsburg Duplex</div>
                            <div className="text-2xl font-bold text-emerald-700">$3,800 - $4,200</div>
                            <div className="text-xs text-emerald-600">Monthly Gross Rent</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="font-bold text-slate-800">Comparable Rentals</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-white text-slate-500 border-b border-slate-100">
                            <tr>
                                <th className="py-3 px-6 text-left font-normal">Property Property</th>
                                <th className="py-3 px-6 text-left font-normal">Type</th>
                                <th className="py-3 px-6 text-left font-normal">Rent</th>
                                <th className="py-3 px-6 text-left font-normal">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="py-3 px-6 font-medium">Royal Ledges (4676 Albany)</td><td className="py-3 px-6">2 BR</td><td className="py-3 px-6 text-slate-700">$1,725+</td><td className="py-3 px-6 text-slate-500">New construction</td></tr>
                            <tr><td className="py-3 px-6 font-medium">Royal Ledges (4676 Albany)</td><td className="py-3 px-6">3 BR</td><td className="py-3 px-6 text-slate-700">$2,275+</td><td className="py-3 px-6 text-slate-500">New construction</td></tr>
                            <tr><td className="py-3 px-6 font-medium">Hudson Place (1 Hudson Dr)</td><td className="py-3 px-6">2 BR</td><td className="py-3 px-6 text-slate-700">$2,400+</td><td className="py-3 px-6 text-slate-500">Professional Mgmt ($2.18/sqft)</td></tr>
                            <tr><td className="py-3 px-6 font-medium">4332 Albany Post Rd #1</td><td className="py-3 px-6">1 BR</td><td className="py-3 px-6 text-slate-700">$1,650</td><td className="py-3 px-6 text-slate-500">Townhouse unit ($2.54/sqft)</td></tr>
                            <tr><td className="py-3 px-6 font-medium">6 Fallkill Rd</td><td className="py-3 px-6">1 BR</td><td className="py-3 px-6 text-slate-700">$1,850</td><td className="py-3 px-6 text-slate-500">Apartment ($2.06/sqft)</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const PropertiesSection = () => (
        <div className="space-y-8">
            {/* Hyde Park Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-slate-100 relative">
                        <img src="https://photos.zillowstatic.com/fp/3610c5c681d407dfb1d45ae2f7e25911-p_c.jpg" className="w-full h-64 md:h-full object-cover" alt="Hyde Park Property" />
                        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-xs font-bold rounded shadow uppercase tracking-wide">Hyde Park</div>
                    </div>
                    <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">4335 Albany Post Road</h2>
                                <p className="text-slate-500 flex items-center gap-1 mt-1"><MapPin className="w-4 h-4" /> Town of Hyde Park, NY 12538</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">$174,900</div>
                                <div className="text-xs text-slate-400">Asking Price</div>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-6">
                            <a href="https://www.zillow.com/homes/4335-Albany-Post-Rd,-Hyde-Park,-NY-12538_rb/" target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition">
                                <ExternalLink className="w-4 h-4" /> View on Zillow
                            </a>
                            <a href="https://www.redfin.com/NY/Hyde-Park/4335-Albany-Post-Rd-12538/home/184179782" target="_blank" rel="noopener noreferrer" className="flex-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-center py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition">
                                <ExternalLink className="w-4 h-4" /> Redfin
                            </a>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="bg-slate-50 p-3 rounded-lg text-center">
                                <div className="font-bold text-slate-900">1,955</div>
                                <div className="text-xs text-slate-500">Sq Ft</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg text-center">
                                <div className="font-bold text-slate-900">4 / 2</div>
                                <div className="text-xs text-slate-500">Beds / Baths</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg text-center">
                                <div className="font-bold text-slate-900">0.26</div>
                                <div className="text-xs text-slate-500">Acres</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg text-center">
                                <div className="font-bold text-slate-900">MLS</div>
                                <div className="text-xs text-slate-500">#20254606</div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">Details & Condition</h4>
                                <div className="text-sm text-slate-600 space-y-3">
                                    <p className="italic">"2 family house on a long 0.26 lot with off street parking. Ready for restoration, on a busy road."</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li><strong>Type:</strong> Legal Two-Family (Class 220)</li>
                                            <li><strong>School:</strong> Hyde Park Central</li>
                                            <li><strong>Condition:</strong> Structurally sound but looks rough. Needs new Heating, Electric, Plumbing.</li>
                                        </ul>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li><strong>Pricing History:</strong> Varied ($174k - $228k). Inconsistent pricing suggests motivated seller.</li>
                                            <li><strong>Target Price:</strong> $165,000 - $175,000</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">Location Analysis</h4>
                                <div className="text-sm text-slate-600 space-y-1">
                                    <ul className="list-disc list-inside space-y-1">
                                        <li><strong>Location:</strong> Direct frontage on Route 9 (Albany Post Road).</li>
                                        <li><strong>Proximity:</strong> Close to CIA & Marist College; 20 min to Metro-North.</li>
                                        <li><strong>Environment:</strong> Busy commercial corridor; high traffic volume.</li>
                                        <li><strong>Zoning/Use:</strong> Legal Two-Family (Class 220).</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Staatsburg Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-slate-100 relative">
                        <img src="https://photos.zillowstatic.com/fp/44f5afba64f7e58e8804d489fab9affe-cc_ft_960.jpg" className="w-full h-64 md:h-full object-cover" alt="Staatsburg Property" />
                        <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 text-xs font-bold rounded shadow uppercase tracking-wide">Staatsburg (FSBO)</div>
                    </div>
                    <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">61 Old Post Road</h2>
                                <p className="text-slate-500 flex items-center gap-1 mt-1"><MapPin className="w-4 h-4" /> Hamlet of Staatsburg, NY 12580</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-emerald-600">$205,000</div>
                                <div className="text-xs text-slate-400">Owner Financing / For Sale By Owner</div>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-6">
                            <a href="https://www.zillow.com/homes/61-Old-Post-Rd,-Staatsburg,-NY-12580_rb/" target="_blank" rel="noopener noreferrer" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-center py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition">
                                <ExternalLink className="w-4 h-4" /> View on Zillow
                            </a>
                            <a href="https://www.trulia.com/home/61-old-post-rd-staatsburg-ny-12580-2098652077" target="_blank" rel="noopener noreferrer" className="flex-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-center py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition">
                                <ExternalLink className="w-4 h-4" /> Trulia
                            </a>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="bg-slate-50 p-3 rounded-lg text-center">
                                <div className="font-bold text-slate-900">2,584</div>
                                <div className="text-xs text-slate-500">Sq Ft</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg text-center">
                                <div className="font-bold text-slate-900">5 / 2</div>
                                <div className="text-xs text-slate-500">Beds / Baths</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg text-center">
                                <div className="font-bold text-slate-900">1900</div>
                                <div className="text-xs text-slate-500">Year Built</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg text-center">
                                <div className="font-bold text-slate-900">Tax</div>
                                <div className="text-xs text-slate-500">$2,785/yr</div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">Details & History</h4>
                                <div className="text-sm text-slate-600 space-y-3">
                                    <div className="flex gap-2 items-start py-2 bg-amber-50 border border-amber-200 p-2 rounded text-amber-800 text-xs">
                                        <AlertTriangle className="w-4 h-4 shrink-0" />
                                        <p><strong>Critical Insight:</strong> Sold for $65,000 in 2018 (Distressed). Roof replaced in 2018. Requires FULL gut renovation (MEP + Interior).</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li><strong>Implied Market Val:</strong> $346,479</li>
                                            <li><strong>Construction:</strong> Metal exterior, Unfinished basement</li>
                                            <li><strong>Tax Rate:</strong> 2.26% Effective</li>
                                        </ul>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li><strong>Sales History:</strong> Listed $234k (Nov '25) &rarr; $205k (Dec '25).</li>
                                            <li><strong>Target Price:</strong> $185,000 - $195,000</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">Location Analysis</h4>
                                <div className="text-sm text-slate-600 space-y-1">
                                    <ul className="list-disc list-inside space-y-1">
                                        <li><strong>Setting:</strong> Quiet residential setting in walkable village.</li>
                                        <li><strong>Amenities:</strong> Adjacent to park, library, and Mills Mansion State Park.</li>
                                        <li><strong>Building Age:</strong> Built 1900 (125+ years old).</li>
                                        <li><strong>Sale Type:</strong> FSBO (For Sale By Owner).</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const ROISection = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">Return on Investment</h2>
                <div className="flex bg-slate-200 p-1 rounded-lg">
                    <button onClick={() => setRoiMode('cash')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${roiMode === 'cash' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>All Cash Purchase</button>
                    <button onClick={() => setRoiMode('leveraged')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${roiMode === 'leveraged' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>With Mortgage (20% Down)</button>
                </div>
            </div>

            {roiMode === 'leveraged' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-red-800 text-sm">Negative Cash Flow</h4>
                        <p className="text-red-700 text-xs mt-1">At current interest rates (7.5%), the rental income won't cover the mortgage and costs with an 80% loan.</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { name: 'Hyde Park', acq: 174900, reno: hpTotal, rent: 3600, color: 'blue' },
                    { name: 'Staatsburg', acq: 205000, reno: stTotal, rent: 4000, color: 'emerald' }
                ].map(p => {
                    const closing = p.name === 'Hyde Park' ? 5247 : 6150;
                    const holding = p.name === 'Hyde Park' ? 6000 : 7000;
                    const totalInvestment = p.acq + p.reno + closing + holding;
                    const operatingExp = (p.rent * 12) * 0.40;
                    const noi = (p.rent * 12) - operatingExp;

                    // Leveraged calc
                    const ltv = 0.80;
                    const loanAmount = totalInvestment * ltv;
                    const downPayment = totalInvestment * 0.20;
                    const actualLoan = totalInvestment * 0.80;
                    const interestRate = 0.075;
                    const monthlyRate = interestRate / 12;
                    const numPayments = 30 * 12;
                    const monthlyPI = (actualLoan * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
                    const annualDebtService = monthlyPI * 12;
                    const cashFlow = noi - annualDebtService;
                    const coc = (cashFlow / downPayment) * 100;
                    const capRate = (noi / totalInvestment) * 100;

                    return (
                        <div key={p.name} className={`bg-white rounded-xl shadow-sm border-t-4 ${p.color === 'emerald' ? 'border-emerald-500' : 'border-blue-500'} p-6`}>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{p.name} Analysis</h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-slate-500"><span>Purchase Price</span><span>{formatCurrency(p.acq)}</span></div>
                                <div className="flex justify-between text-slate-500"><span>Renovation (inc. 15%)</span><span>{formatCurrency(p.reno)}</span></div>
                                <div className="flex justify-between text-slate-500"><span>Closing & Holding</span><span>{formatCurrency(closing + holding)}</span></div>
                                <div className="flex justify-between font-bold text-slate-900 border-t border-slate-100 pt-2"><span>Total Cost</span><span>{formatCurrency(totalInvestment)}</span></div>
                                <div className="flex justify-between text-slate-500 pt-2"><span>Cost Per Apartment</span><span>{formatCurrency(totalInvestment / 2)}</span></div>

                                <div className="my-4 border-t border-slate-200"></div>

                                <div className="flex justify-between"><span>Annual Gross Rent</span><span className="font-medium">{formatCurrency(p.rent * 12)}</span></div>
                                <div className="flex justify-between text-slate-500"><span>Running Costs (40%)</span><span>-{formatCurrency(operatingExp)}</span></div>
                                <div className="flex justify-between font-bold text-slate-900 bg-slate-50 p-2 rounded"><span>Net Profit (Pre-Mortgage)</span><span>{formatCurrency(noi)}</span></div>

                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    <div className="p-3 bg-slate-50 rounded text-center">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider">Yearly Yield</div>
                                        <div className="text-xl font-bold text-slate-800">{capRate.toFixed(1)}%</div>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded text-center">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider">{roiMode === 'cash' ? 'Return on Cash' : 'Return on Cash'}</div>
                                        <div className={`text-xl font-bold ${roiMode === 'leveraged' && coc < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                            {roiMode === 'cash' ? capRate.toFixed(1) : coc.toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                                {roiMode === 'leveraged' && (
                                    <div className="mt-2 text-xs text-center text-slate-400">
                                        Mortgage Payment: {formatCurrency(annualDebtService)} • Cash Flow: <span className={cashFlow < 0 ? 'text-red-500' : 'text-green-500'}>{formatCurrency(cashFlow)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const LivableSection = () => {
        // "Make Livable" Costs - Significantly reduced scope
        const livableCosts = {
            hp: 115000, // ~50% of full reno (Systems repair vs new, paint, clean, basic kitchen refresh)
            st: 145000, // ~60% of full reno (Still needs major systems, but basic finishes)
        };

        return (
            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Save className="w-5 h-5 text-indigo-500" /> "Make Livable" Plan (Minimum Viable Product)
                    </h2>
                    <p className="text-slate-600 mb-6">
                        A simplified renovation scope focusing only on code compliance, safety, and basic habitability. This reduces upfront capital but may result in lower rental premiums and higher maintenance deferred to later years.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { name: 'Hyde Park', full: hpTotal, livable: livableCosts.hp, rent: 3400, color: 'blue' },
                            { name: 'Staatsburg', full: stTotal, livable: livableCosts.st, rent: 3600, color: 'emerald' }
                        ].map(p => {
                            const saved = p.full - p.livable;
                            const totalInvLivable = (p.name === 'Hyde Park' ? 174900 : 205000) + p.livable + 12000; // + closing/holding approx
                            const noiLivable = (p.rent * 12) * 0.60; // 40% exp
                            const capRateLivable = (noiLivable / totalInvLivable) * 100;

                            return (
                                <div key={p.name} className={`bg-slate-50 rounded-xl border border-slate-200 p-5`}>
                                    <h3 className="font-bold text-slate-900 mb-3">{p.name}</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center bg-white p-3 rounded border border-slate-200">
                                            <span className="text-sm text-slate-500">Full Reno Cost</span>
                                            <span className="font-semibold text-slate-400 line-through">{formatCurrency(p.full)}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-indigo-50 p-3 rounded border border-indigo-100">
                                            <span className="text-sm font-bold text-indigo-900">Livable Cost</span>
                                            <span className="font-bold text-indigo-700">{formatCurrency(p.livable)}</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-emerald-600 font-medium px-1">
                                            <span>Initial Savings</span>
                                            <span>{formatCurrency(saved)}</span>
                                        </div>

                                        <div className="my-3 border-t border-slate-200"></div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">New Est. Yield</span>
                                            <span className="text-lg font-bold text-slate-900">{capRateLivable.toFixed(1)}%</span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2">
                                            *Assumes slightly lower rents (${formatCurrency(p.rent)}) due to basic finishes.
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-indigo-900 text-indigo-50 p-6 rounded-xl">
                    <h3 className="font-bold mb-2">Scope Reduction For "Livable" Status</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-indigo-200">
                        <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div><span><strong>Kitchens:</strong> Paint cabinets & new hardware instead of full replacement.</span></li>
                        <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div><span><strong>Floors:</strong> Clean/Refinish existing hardwood/vinyl instead of all new LVP.</span></li>
                        <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div><span><strong>Systems:</strong> Repair where possible (if safe) instead of full replacement.</span></li>
                        <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div><span><strong>Cosmetic:</strong> Paint only; no structural changes or wall moving.</span></li>
                    </ul>
                </div>
            </div>
        );
    };

    const QuadplexSection = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-emerald-500" /> Staatsburg Quadplex Conversion
                </h2>
                <p className="text-slate-600 mb-6">
                    The Staatsburg property's larger footprint (2,584 sq ft) makes it a candidate for conversion from 2 units to 4 units. This triggers significant code requirements and alters the financial profile.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-3">Regulatory & Code Requirements</h3>
                        <ul className="space-y-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                            <li className="flex gap-2"><div className="min-w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div><span><strong>Zoning:</strong> Needs Variance/Special Use (Town of Hyde Park)</span></li>
                            <li className="flex gap-2"><div className="min-w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5"></div><span><strong>Fire:</strong> 2-hour fire rated walls between units</span></li>
                            <li className="flex gap-2"><div className="min-w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5"></div><span><strong>Exits:</strong> 2 ways out per apartment</span></li>
                            <li className="flex gap-2"><div className="min-w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5"></div><span><strong>Fire Sprinklers:</strong> Likely required (Est. $15k-$25k)</span></li>
                            <li className="flex gap-2"><div className="min-w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5"></div><span><strong>Parking:</strong> 4-8 spaces required</span></li>
                            <li className="flex gap-2"><div className="min-w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5"></div><span><strong>Timeline:</strong> 3-6 months approval + renovation</span></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-3">Additional Capital Requirements</h3>
                        <div className="bg-slate-50 rounded-lg overflow-hidden text-sm">
                            {[
                                { item: '2 Additional Kitchens', cost: '$40k - $60k' },
                                { item: '2 Additional Baths', cost: '$20k - $40k' },
                                { item: 'Fire Walls & Heating', cost: '$24k - $43k' },
                                { item: 'Sprinkler/Parking/Fees', cost: '$45k - $88k' },
                            ].map((r, i) => (
                                <div key={i} className="flex justify-between p-3 border-b border-slate-100 last:border-0">
                                    <span>{r.item}</span>
                                    <span className="font-medium text-slate-900">{r.cost}</span>
                                </div>
                            ))}
                            <div className="flex justify-between p-3 bg-emerald-50 text-emerald-800 font-bold">
                                <span>Total Conversion Cost</span>
                                <span>$129k - $231k</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-emerald-900 text-emerald-50 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-1">Impact on Returns</h3>
                            <p className="text-emerald-200 text-sm">Comparison of stabilizing as Duplex vs. Conversion</p>
                        </div>
                        <div className="flex gap-8 text-center">
                            <div>
                                <div className="text-sm text-emerald-300 uppercase tracking-wider">Before (Duplex)</div>
                                <div className="text-3xl font-bold">6.3%</div>
                                <div className="text-xs text-emerald-400">Yearly Yield</div>
                            </div>
                            <ArrowRight className="text-emerald-500 w-8 h-8 mt-2" />
                            <div>
                                <div className="text-sm text-emerald-300 uppercase tracking-wider">After (Quad)</div>
                                <div className="text-3xl font-bold text-white">9.2%</div>
                                <div className="text-xs text-emerald-400">Yearly Yield</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const ContactsSection = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Contacts Directory</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="font-bold text-slate-700 mb-2 border-b pb-1">Hyde Park Municipal</h3>
                        <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex justify-between"><span>Town Hall</span><span className="font-mono text-slate-800">(845) 229-5111</span></div>
                            <div className="flex justify-between"><span>Building Dept</span><span className="font-mono text-slate-800">(845) 229-5111</span></div>
                            <div className="flex justify-between"><span>Planning & Zoning</span><span className="font-mono text-slate-800">(845) 229-0316</span></div>
                            <div className="flex justify-between"><span>Assessor</span><span className="font-mono text-slate-800">(845) 229-7103</span></div>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="font-bold text-slate-700 mb-2 border-b pb-1">Property Contacts</h3>
                        <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex flex-col">
                                <span className="font-semibold text-slate-800">Ronnie Rebis (Grist Mill RE)</span>
                                <span>Listing Agent (Hyde Park) • MLS #20254606</span>
                            </div>
                            <div className="flex flex-col pt-2">
                                <span className="font-semibold text-slate-800">Owner (FSBO)</span>
                                <span>Staatsburg Property • <span className="font-mono text-blue-600">(845) 330-9165</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Due Diligence Checklist</h2>

                <div className="space-y-4">
                    {[
                        { title: 'Pre-Offer Phase', items: ['Verify zoning classification', 'Confirm legal duplex status', 'Review tax/liens', 'Check flood zone', 'Assess neighborhood crime', 'Drive by at different times'] },
                        { title: 'Under Contract', items: ['Professional Inspection', 'Structural Engineering (1900 build)', 'Lead & Asbestos Testing', 'Septic/Well Inspection', 'Title Search & Insurance', 'Contractor Bids (Renovation)'] },
                        { title: 'Specific: Staatsburg', items: ['Review 2018 Sale ($65k) history', 'Verify roof replacement docs', 'Inquire Quadplex feasibility'] },
                        { title: 'Specific: Hyde Park', items: ['Road noise impact assessment', 'Environmental (Gas station proximity)'] }
                    ].map((group, idx) => (
                        <div key={idx} className="border border-slate-100 rounded-lg overflow-hidden">
                            <div className="bg-slate-50 px-4 py-2 font-semibold text-slate-700 text-sm border-b border-slate-100">{group.title}</div>
                            <div className="p-2 space-y-1">
                                {group.items.map(item => (
                                    <button
                                        key={item}
                                        onClick={() => toggleCheck(item)}
                                        className="w-full text-left flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-md transition"
                                    >
                                        {checklist[item] ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-300" />}
                                        <span className={`text-sm ${checklist[item] ? 'text-slate-400 line-through' : 'text-slate-600'}`}>{item}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const RenovationSection = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Renovation Calculator</h2>
                        <p className="text-sm text-slate-500">Estimates based on Hudson Valley pricing (20-30% below NYC).</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setIsEditingReno(!isEditingReno)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${isEditingReno ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white border border-slate-300 text-slate-600'}`}>
                            {isEditingReno ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />} {isEditingReno ? 'Save Changes' : 'Edit Estimates'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { name: 'Hyde Park (1,955 sf)', prefix: 'hp', total: hpTotal },
                        { name: 'Staatsburg (2,584 sf)', prefix: 'st', total: stTotal }
                    ].map((prop) => (
                        <div key={prop.prefix} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                            <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-3">
                                <h3 className="font-bold text-slate-800">{prop.name}</h3>
                                <div className="text-xl font-bold text-blue-600">{formatCurrency(prop.total)}</div>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { label: 'Systems (Heat, Elec, Water)', keys: ['hvac', 'electrical', 'panels', 'plumbing', 'waterHeaters'] },
                                    { label: 'Structure & Outside (Roof, Windows)', keys: ['roof', 'foundation', 'windows', 'siding', 'doors'] },
                                    { label: 'Inside (Kitchens, Floors, Paint)', keys: ['kitchens', 'bathrooms', 'flooring', 'drywall', 'painting', 'trim', 'fixtures'] },
                                    { label: 'Permits & Cleanup', keys: ['permits', 'architect', 'cleanup'] }
                                ].map((group, gIdx) => {
                                    const groupTotal = group.keys.reduce((sum, k) => sum + renoCosts[`${prop.prefix}_${k}`], 0);
                                    return (
                                        <div key={gIdx}>
                                            <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-tighter mb-1">
                                                <span>{group.label}</span>
                                                <span>{formatCurrency(groupTotal)}</span>
                                            </div>
                                            <div className={`pl-2 border-l-2 space-y-1 mb-3 mt-2 ${isEditingReno ? 'border-blue-300' : 'border-slate-200'}`}>
                                                {group.keys.map(k => (
                                                    <div key={k} className="flex justify-between items-center text-xs">
                                                        <span className="text-slate-500 capitalize">{k.replace('hvac', 'Heating/Cooling').replace(/([A-Z])/g, ' $1').trim()}</span>
                                                        {isEditingReno ? (
                                                            <input
                                                                type="number"
                                                                value={renoCosts[`${prop.prefix}_${k}`]}
                                                                onChange={(e) => updateRenoCost(`${prop.prefix}_${k}`, e.target.value)}
                                                                className="w-24 text-right p-1 border border-slate-300 rounded bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                            />
                                                        ) : (
                                                            <span className="font-medium text-slate-700">{formatCurrency(renoCosts[`${prop.prefix}_${k}`])}</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-600">Buffer Budget ({renoCosts.contingencyPct}%)</span>
                                <span className="text-sm text-slate-600">{formatCurrency(prop.total * (renoCosts.contingencyPct / (100 + renoCosts.contingencyPct)))}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
            {/* Header */}
            <header className="bg-slate-900 text-white pt-8 pb-12 px-6 shadow-lg">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2 tracking-tight">Dutchess County Investment Analysis</h1>
                            <p className="text-slate-400">Two-Property Portfolio Due Diligence • January 2026</p>
                        </div>
                        <div className="border border-slate-700 bg-slate-800 px-4 py-2 rounded-lg">
                            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Cost</div>
                            <div className="text-lg font-bold text-slate-200">$886k</div>
                            <div className="text-xs text-slate-500">For Both Properties</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex overflow-x-auto no-scrollbar gap-1 py-1">
                        {sections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap text-sm font-medium ${activeSection === section.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                                    }`}
                            >
                                <section.icon className="w-4 h-4" />
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-6 py-8 -mt-4">
                {activeSection === 'summary' && <SummarySection />}
                {activeSection === 'market' && <MarketSection />}
                {activeSection === 'properties' && <PropertiesSection />}
                {activeSection === 'renovation' && <RenovationSection />}
                {activeSection === 'roi' && <ROISection />}
                {activeSection === 'livable' && <LivableSection />}
                {activeSection === 'quadplex' && <QuadplexSection />}
                {activeSection === 'contacts' && <ContactsSection />}
            </main>
        </div>
    );
}
// End of Component
