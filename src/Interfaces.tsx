// TypeScript needs interfaces for any data type

import { DocumentData, DocumentSnapshot } from "firebase/firestore";

export interface UserInStore extends DocumentData {
  name: string;
  email: string;
}

export const userInStoreConverter = {
    toFirestore: (user: UserInStore): UserInStore => {
        return ({
            name: user.name,
            email: user.email
            })
    },
    fromFirestore: (userSnapshot: any): UserInStore => {
        const userData = userSnapshot.data();
        return {
            name: userData.name,
            email: userData.email,
        }
    }
}

export interface FoodItem {
  //TODO: Add fid
  expiry: string
  name: string
  quantity: number
  photoUrl?: string
}

export interface UserFoodItem extends DocumentData {
  householdName: string;
  foodItems: FoodItem[];
}

export const userFoodItemConverter = {
    toFirestore: (userFoodItem: UserFoodItem): UserFoodItem => {
        return ({
            householdName: userFoodItem.householdName,
            foodItems: userFoodItem.foodItems,
            })
    },
    fromFirestore: (userSnapshot: any): UserFoodItem => {
        const userData = userSnapshot.data();
        return {
            householdName: userData.householdName,
            foodItems: userData.foodItems,
        }
    }
}
