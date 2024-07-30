export type Order = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    street: string;
    streetNumber: string;
    zip: string;
    city: string;
    country: string;
    dateOfOrder: string;
    comments?: string;
    orderItems: {
        id: number;
        name: string;
        price: number;
        type: string;
        quantity?: number;
    }[]
};
