// Main App
import { initializeApp } from "firebase/app";
// Firestore
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  getDoc,
  DocumentData,
  Unsubscribe,
  runTransaction,
} from "firebase/firestore";
// Authentication
import { getAuth } from "firebase/auth";
// API Key
import { firebaseConfig } from "../../Constants";
import { UserInStore, FoodItem, UserFoodItem, userInStoreConverter, userFoodItemConverter } from "../Interfaces";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//-------------------Firestore References-------------------
// Reference to Firestore
const db = getFirestore(app);

// Reference to Foods Collection
const foodsRef = (uid: string) => doc(db, FOODS_COLLECTION_ID, uid).withConverter(userFoodItemConverter);

// Reference to Users Collection
const usersRef = doc(db, USERS_COLLECTION_ID).withConverter(userInStoreConverter)

// Collections need a doc inside them always
// Get uid from auth

//-------------------Firestore Foods Methods-------------------

/**
 * Adds a user's basic info to DB after sign-up.
 * 
 * @param uid User's unique ID from auth.
 * @param user The User Details to add.
 * @returns A promise containing a boolean that returns true if no errors occurred in the process.
 */
async function addAuthenticatedUserAfterSignup(
  uid: string,
  user: UserInStore
): Promise<boolean> {
  const { name, email } = user;

  // Add to users and create food items table
  const responses = await Promise.allSettled([
    addDoc(collection(db, USERS_COLLECTION_ID, uid), {
      name: name,
      uid: uid,
      email: email,
    }),
    addDoc(collection(db, FOODS_COLLECTION_ID, uid), {
      householdName: `${name}'s House`,
      foodItems: [], // Should be of type FoodItem
    }),
  ]);

  // Log Errors if any
  responses.forEach((resp) => {
    if (resp.status === "rejected") {
      console.error(resp.reason);
      return false
    }
  });

  return true
}

/**
 * Returns a Promise containing the UserInStore data.
 * 
 * @param uid User's unique ID from auth.
 * @returns Promise containing UserInStore for corresponding uid.
 */
async function getUserFromStore(uid: string): Promise<DocumentData | void | undefined> {
  return getDoc(doc(db, USERS_COLLECTION_ID, uid))
    .then((doc) => doc.data())
    .catch(console.error);
}

/**
 * Subscribes to a User Food Item listener and returns an unsubscribe function.
 * 
 * @param uid User's unique ID from auth.
 * @param onNext Function that will handle whenever a new snapshot is available.
 * @returns An unsubscribe function that should be called to clean up the listener.
 */
async function getFoodItemsByUser(
  uid: string,
  onNext: (userFoodItem?: DocumentData) => void
): Promise<Unsubscribe> {
  const unsubFunc = onSnapshot(doc(db, FOODS_COLLECTION_ID, uid), (doc) => {
    onNext(doc.data());
  });
  return unsubFunc;
}

async function addFoodItemToUser (uid: string, foodItem: FoodItem) {
  await runTransaction(db, async (transaction) => {
    const userFoodItemSnap = await transaction.get(foodsRef(uid))
    const userFoodItem = userFoodItemSnap.data()

    if (userFoodItem) {
      const foodItemList = userFoodItem.foodItems
      const newFoodItemList = foodItemList.concat([foodItem])
      transaction.update(foodsRef(uid), {foodItems: newFoodItemList})
    }
  })
  .then((_resp) => {})
  .catch(console.error)
}

async function deleteFoodItemFromUser (uid: string, foodItem: FoodItem) {
  await runTransaction(db, async (transaction) => {
    const userFoodItemSnap = await transaction.get(foodsRef(uid))
    const userFoodItem = userFoodItemSnap.data()

    if (userFoodItem) {
      const foodItemList = userFoodItem.foodItems
      const newFoodItemList = foodItemList.filter(item => item.name !== foodItem.name)
      transaction.update(foodsRef(uid), {foodItems: newFoodItemList})
    }
  })
  .then((_resp) => {})
  .catch(console.error)
}
