import { Injectable } from '@angular/core';

export type Info = {
    firstName: string,
    lastName: string,
    mobile: string,
    email: string,
    street: string,
    number: string,
    zip: string,
    city: string,
    country: string,
    comments?: string,
}

@Injectable({ providedIn: 'root' })
export class BuyersInfoService {

    buyersInfo: Info = {} as Info;

    getBuyersInfo(info: Info) {
        this.buyersInfo = info;
    }
}