import Dexie, { Table } from "dexie";

export interface CustomBang {
    id?: number;
    bang: string;
    url: string;
    description: string;
}

export class BngrDatabase extends Dexie {
    customBangs!: Table<CustomBang>;

    constructor() {
        super("BngrDatabase");
        this.version(1).stores({
            customBangs: "++id, bang, url, description",
        });
    }
}

export const db = new BngrDatabase();
