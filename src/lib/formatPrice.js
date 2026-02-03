/**
 * Format amount in INR with ₹ symbol (Indian number grouping).
 */
export function formatPrice(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}
