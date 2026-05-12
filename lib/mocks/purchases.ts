import { Purchase } from "../types";

export const mockPurchases: Purchase[] = [
  {
    id: "p1",
    userId: "any",
    productName: "Premium Membership",
    amount: 29.99,
    currency: "USD",
    status: "completed",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "p2",
    userId: "any",
    productName: "Basic Plan",
    amount: 9.99,
    currency: "USD",
    status: "completed",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "p3",
    userId: "any",
    productName: "Enterprise Toolset",
    amount: 199.99,
    currency: "USD",
    status: "pending",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "p4",
    userId: "any",
    productName: "Support Package",
    amount: 49.99,
    currency: "USD",
    status: "failed",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: "p5",
    userId: "any",
    productName: "Premium Membership",
    amount: 29.99,
    currency: "USD",
    status: "completed",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];
