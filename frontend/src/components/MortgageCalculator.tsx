import { useState } from "react";
import { Slider } from "./ui/slider";

interface MortgageCalculatorProps {
    propertyPrice: number;
}

export default function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
    const ANNUAL_RATE = 4.96; // 4.96% annual interest rate
    const [downPayment, setDownPayment] = useState(propertyPrice * 0.2); // Default 20%
    const [loanTerm, setLoanTerm] = useState(30); // Default 30 years

    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = ANNUAL_RATE / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly payment using mortgage formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const calculateMonthlyPayment = () => {
        if (loanAmount <= 0) return 0;

        const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
        const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
        const monthlyPayment = loanAmount * (numerator / denominator);

        return monthlyPayment;
    };

    const monthlyPayment = calculateMonthlyPayment();
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    const downPaymentPercentage = (downPayment / propertyPrice) * 100;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 space-y-6 border border-blue-100">
            <div className="flex items-center gap-2">
                <span className="text-2xl">🏦</span>
                <h3 className="text-xl font-bold text-gray-900">Mortgage Calculator</h3>
            </div>

            {/* Down Payment Slider */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Down Payment</label>
                    <div className="text-right">
                        <span className="text-lg font-bold text-primary">₪{downPayment.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 ml-2">({downPaymentPercentage.toFixed(1)}%)</span>
                    </div>
                </div>
                <Slider
                    value={[downPayment]}
                    onValueChange={(value) => setDownPayment(value[0])}
                    min={0}
                    max={propertyPrice}
                    step={10000}
                    className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>₪0</span>
                    <span>₪{propertyPrice.toLocaleString()}</span>
                </div>
            </div>

            {/* Loan Term Selection */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Loan Term</label>
                <div className="grid grid-cols-4 gap-2">
                    {[15, 20, 25, 30].map((years) => (
                        <button
                            key={years}
                            onClick={() => setLoanTerm(years)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${loanTerm === years
                                    ? "bg-primary text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                                }`}
                        >
                            {years} yrs
                        </button>
                    ))}
                </div>
            </div>

            {/* Calculation Results */}
            <div className="bg-white rounded-lg p-4 space-y-3 shadow-sm">
                <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-sm text-gray-600">Loan Amount</span>
                    <span className="text-lg font-semibold text-gray-900">₪{loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-sm text-gray-600">Interest Rate</span>
                    <span className="text-lg font-semibold text-gray-900">{ANNUAL_RATE}%</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-sm text-gray-600">Monthly Payment</span>
                    <span className="text-xl font-bold text-primary">₪{monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Interest</span>
                    <span className="text-sm font-medium text-gray-700">₪{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-primary/10 to-blue-100 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                    With a down payment of <span className="font-semibold">₪{downPayment.toLocaleString()}</span>,
                    you'll need a loan of <span className="font-semibold">₪{loanAmount.toLocaleString()}</span> for {loanTerm} years.
                </p>
                <p className="text-sm text-gray-700 mt-2">
                    Your monthly payment will be <span className="font-bold text-primary">₪{monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>.
                </p>
            </div>

            <p className="text-xs text-gray-500 text-center">
                * This is an estimate. Actual rates and terms may vary.
            </p>
        </div>
    );
}
