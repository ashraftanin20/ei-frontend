export interface Invoice {
    id: number;
    item: string;
    price: number;
    description: string;
    qty: number;
    address: string;
    orderedDate: string;
    deliveredDate?: string;
}
