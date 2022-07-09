// TypeScript needs interfaces for any data type

import { DocumentData } from "firebase/firestore"

export interface UserInStore {
    name: string
    email: string
}

export interface FoodItem {
    fid: string
    expiry: Date
    name: string
    photoUrl?: string
}

export interface UserFoodItem extends DocumentData {
    householdName: string
    foodItems: FoodItem[]
}
