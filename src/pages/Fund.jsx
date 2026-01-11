// src/pages/Fund.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { getAuthHeaders } from '../services/api';
import { ArrowDownCircle, ArrowUpCircle, Printer, Wallet } from "lucide-react";
import SavePDF from "../components/buttons/SavePDF"; 
// --- Constants & Utils ---
import API from "../api/api"
import Loading from '../components/Loading';
const CURRENCY_SYMBOL = '৳';


function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '-';
  return `${CURRENCY_SYMBOL}${amount.toFixed(2)}`;
}

function safeDateString(raw) {
  try {
    const d = new Date(raw);
    if (isNaN(d)) return '-';
    return d.toLocaleDateString();
  } catch {
    return '-';
  }
}

// --- API helpers ---
async function fetchBalance() {
  const res = await API.get("/funds/balance/");
  const data = res.data;   // axios automatically parses JSON
  console.log("Balance API response:", data);

  if (Array.isArray(data) && data.length > 0) {
    const num = parseFloat(data[0].balance);
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

async function fetchHistory() {
  const res = await API.get("/funds/transactions/");
  const data = res.data;
  console.log("History API response:", data);

  return Array.isArray(data) ? data : data.results || [];
}

async function postAddFunds({ amount, reason, type, payment_method, date }, signal) {
  const body = { type, amount, reason, payment_method, date };
  const res = await API.post("/funds/transactions/", body, { signal });
  return res.data;
}


// --- UI Components ---
function WalletOverview({ balance, onAddClick, loading }) {
  return (
    <div className="relative bg-blue-950 rounded-2xl p-8 shadow-xl text-white overflow-hidden mt-20">
      <div className="absolute inset-0 bg-indigo-700/30 backdrop-blur-sm rounded-2xl"></div>
      <div className="relative flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm opacity-80"><Wallet size={18} /> Current Balance</div>
          <div className="text-5xl font-extrabold tracking-tight mt-2">{loading ? "..." : formatCurrency(balance)}</div>
          <p className="mt-2 text-sm opacity-80">Updated just now • Keep tracking your funds</p>
        </div>
        <button
          onClick={onAddClick}
          className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg hover:scale-105 transform transition"
        >
          + Add Funds
        </button>
      </div>
      <div className="relative mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 bg-white/10 rounded-xl p-3">
          <ArrowDownCircle className="text-green-300" size={20} />
          <span>Income Boost</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-xl p-3">
          <ArrowUpCircle className="text-red-300" size={20} />
          <span>Expense Control</span>
        </div>
      </div>
    </div>
  );
}

function TransactionRow({ tx }) {
  const date = safeDateString(tx.date || tx.created_at || tx.timestamp);
  const amount = tx.amount ?? 0;
  const balance_after = tx.after_transaction_balance;
  const isExpense = tx.type === "EXPENSE";
  const AmountIcon = isExpense ? ArrowUpCircle : ArrowDownCircle;

  return (
    <tr className="hover:bg-gray-100 transition border-b">
      <td className="px-4 py-3 text-gray-600">{date || "-"}</td>
      <td className={`px-4 py-3 flex items-center gap-2 font-semibold ${isExpense ? "text-red-600" : "text-green-600"}`}>
        <AmountIcon size={18} />
        {isExpense ? "-" : "+"}{formatCurrency(amount)}
      </td>
      <td className="px-4 py-3 text-gray-700">{tx.reason || "-"}</td>
      <td className="px-4 py-3 font-medium text-gray-800">{balance_after != null ? formatCurrency(balance_after) : "-"}</td>
    </tr>
  );
}

function AddFundsModal({ onClose, onSubmit, currentBalance, submitting, apiError }) {
  const [type, setType] = useState('INCOME');
  const [amountInput, setAmountInput] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [payment_method, setPaymentMethod] = useState('Cash');
  const [validationError, setValidationError] = useState(null);

  const parseAmount = () => {
    const v = parseFloat(amountInput);
    if (isNaN(v)) return null;
    return v;
  };

  const validate = () => {
    const amt = parseAmount();
    if (amt === null) return 'Amount must be a number';
    if (amt <= 0) return 'Amount must be greater than zero';
    if (!payment_method) return 'Select a payment method';
    if (!date) return 'Please select a date';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setValidationError(err);
    if (err) return;
    const amount = parseAmount();
    onSubmit({ amount, reason, type, payment_method, date });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg w-full max-w-md p-8 relative">
        <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">✕</button>
        <h2 className="text-xl font-semibold mb-2">Add Funds</h2>
        <div className="text-sm text-gray-600 mb-4">
          Current balance: <strong>{formatCurrency(currentBalance)}</strong>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border rounded px-3 py-2">
              <option value="INCOME">INCOME</option>
              <option value="EXPENSE">EXPENSE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="text"
              value={amountInput}
              onChange={(e) => { setAmountInput(e.target.value); setValidationError(null); }}
              placeholder="e.g., 100.00 (৳)"
              className="w-full border rounded px-3 py-2"
              aria-invalid={!!validationError}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Reason (optional)</label>
            <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g., donation, fee, refund" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Payment Method</label>
            <select value={payment_method} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border rounded px-3 py-2">
              <option value="Cash">Cash</option>
              <option value="Bkash">Bkash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          {validationError && <div className="text-red-500 text-xs">{validationError}</div>}
          {apiError && <div className="text-red-600 text-sm">{apiError}</div>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100" disabled={submitting}>Cancel</button>
            <button type="submit" disabled={!!validate() || submitting} className="px-5 py-2 bg-blue-950 text-white rounded-full disabled:opacity-50 flex items-center">{submitting ? 'Saving...' : 'Submit'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Date Filter Modal ---
function DateFilterModal({ onClose, onSubmit }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError('Both dates are required');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date cannot be after end date');
      return;
    }
    setError(null);
    onSubmit({ startDate, endDate });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg w-full max-w-md p-8 relative">
        <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">✕</button>
        <h2 className="text-xl font-semibold mb-4">Filter Transactions by Date</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full border rounded px-3 py-2"/>
          </div>
          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full border rounded px-3 py-2"/>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-blue-950 text-white rounded-full">Filter</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function Fund() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [errorBalance, setErrorBalance] = useState(null);
  const [errorHistory, setErrorHistory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pendingTxs, setPendingTxs] = useState([]);
  const [addingError, setAddingError] = useState(null);
  const [adding, setAdding] = useState(false);

  const [showDateFilter, setShowDateFilter] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState(null);

  const loadBalance = useCallback(async () => {
    setLoadingBalance(true); setErrorBalance(null);
    const ctrl = new AbortController();
    try { const b = await fetchBalance(ctrl.signal); setBalance(b); } 
    catch (e) { setErrorBalance(e.message); } 
    finally { setLoadingBalance(false); }
  }, []);

  const loadHistory = useCallback(async () => {
    setLoadingHistory(true); setErrorHistory(null);
    const ctrl = new AbortController();
    try { const h = await fetchHistory(ctrl.signal); setHistory(h); } 
    catch (e) { setErrorHistory(e.message); } 
    finally { setLoadingHistory(false); }
  }, []);

  useEffect(() => { loadBalance(); loadHistory(); }, [loadBalance, loadHistory]);

  const displayBalance = useMemo(() => {
    let delta = 0;
    pendingTxs.forEach((t) => { delta += t.type === 'EXPENSE' ? -(t.amount ?? 0) : (t.amount ?? 0); });
    return balance + delta;
  }, [balance, pendingTxs]);

  const mergedTransactions = useMemo(() => {
    const map = new Map();
    pendingTxs.forEach((t) => map.set(t.id, t));
    history.forEach((t) => map.set(t.id, t));
    const all = Array.from(map.values());
    all.sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (b.status === 'pending' && a.status !== 'pending') return 1;
      const da = new Date(a.created_at || a.timestamp).getTime() || 0;
      const db = new Date(b.created_at || b.timestamp).getTime() || 0;
      return db - da;
    });
    return all;
  }, [pendingTxs, history]);

  const handleAddClick = () => { setAddingError(null); setShowModal(true); };

  const addFunds = async ({ amount, reason, type, payment_method, date }) => {
    setAdding(true); setAddingError(null);
    const optimistic = { id: `opt-${Date.now()}`, amount, reason: reason||'Adding funds...', created_at: new Date().toISOString(), balance_after: displayBalance, type, payment_method, date };
    setPendingTxs((p) => [optimistic, ...p]);
    try {
      const controller = new AbortController();
      const today = new Date().toISOString().slice(0,10);
      const formattedDate = date ? new Date(date).toISOString().slice(0,10) : today;
      const realTx = await postAddFunds({ amount, reason, type, payment_method, date: formattedDate }, controller.signal);
      setPendingTxs((p) => p.filter((t) => t.id !== optimistic.id));
      setHistory((prev) => prev.some((t)=>t.id===realTx.id)?prev:[realTx,...prev]);
      await loadBalance();
      setShowModal(false);
    } catch(e) {
      setPendingTxs((p)=>p.filter((t)=>t.id!==optimistic.id));
      setAddingError(e.message||'Failed to add funds');
    } finally { setAdding(false); }
  };

  const handleDateFilterSubmit = ({ startDate, endDate }) => {
    const filtered = mergedTransactions.filter(tx => {
      const txDate = new Date(tx.date || tx.created_at || tx.timestamp);
      return txDate >= new Date(startDate) && txDate <= new Date(endDate);
    });
    setFilteredTransactions(filtered);
    setShowDateFilter(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pb-20">
      <WalletOverview balance={displayBalance} loading={loadingBalance} onAddClick={handleAddClick} />

      {showModal && <AddFundsModal onClose={()=>setShowModal(false)} currentBalance={displayBalance} onSubmit={addFunds} submitting={adding} apiError={addingError} />}
      {showDateFilter && <DateFilterModal onClose={()=>setShowDateFilter(false)} onSubmit={handleDateFilterSubmit} />}

      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-4xl font-semibold text-blue-950">Transaction History</h3>
          <div className="flex gap-2">
            <button onClick={()=>setShowDateFilter(true)} className="flex items-center gap-2 bg-blue-950 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition">Filter by Date</button>
            <SavePDF/>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3">DATE</th>
                <th className="px-4 py-3">AMOUNT</th>
                <th className="px-4 py-3">REASON</th>
                <th className="px-4 py-3">BALANCE AFTER</th>
              </tr>
            </thead>
            <tbody>
              {loadingHistory && (

                <Loading message="history"/>
              )}

              {!loadingHistory && (filteredTransactions || mergedTransactions).length === 0 && (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-400">No transactions found.</td>
                </tr>
              )}

              {!loadingHistory &&
                (filteredTransactions || mergedTransactions).map(tx => (
                  <TransactionRow key={tx.id} tx={tx} />
                ))
              }
            </tbody>
          </table>
        </div>

        {/* Clear Filter button */}
        {filteredTransactions && filteredTransactions.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setFilteredTransactions(null)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
