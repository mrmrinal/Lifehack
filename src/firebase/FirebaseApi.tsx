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
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
// Storage
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// API Key
import { firebaseConfig } from "../../constants";
// Misc
import { UserInStore, FoodItem, UserFoodItem, userInStoreConverter, userFoodItemConverter } from "../Interfaces";
import { FOODS_COLLECTION_ID, USERS_COLLECTION_ID } from "../AppConstants";
import { v4 as uuid } from 'uuid';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//-------------------Firestore References-------------------
// Reference to Firestore
const db = getFirestore(app);

// Reference to Foods Collection
const foodsRef = (uid: string) => doc(db, FOODS_COLLECTION_ID, uid).withConverter(userFoodItemConverter);

// Reference to Users Collection
const usersRef = (uid: string) => doc(db, USERS_COLLECTION_ID, uid).withConverter(userInStoreConverter)

// Collections need a doc inside them always
// Get uid from auth

//-------------------Firebase Auth References-------------------
const auth = getAuth()

//-------------------Firebase Storage References-------------------
const storage = getStorage()

//-------------------Firestore Foods Methods-------------------

/**
 * Adds a user's basic info to DB after sign-up.
 * 
 * @param uid User's unique ID from auth.
 * @param user The User Details to add.
 * @returns A promise containing a boolean that returns true if no errors occurred in the process.
 */
async function addAuthenticatedUserAfterSignup(
  user: UserInStore
) {
  const { name, email } = user;

  // Add to users and create food items table
  await addDoc(collection(db, USERS_COLLECTION_ID), {
      name: name,
      email: email,
    })
  await addDoc(collection(db, FOODS_COLLECTION_ID), {
      householdName: `${name}'s House`,
      foodItems: [], // Should be of type FoodItem
    })
  }

/**
 * Returns a Promise containing the UserInStore data.
 * 
 * @param uid User's unique ID from auth.
 * @returns Promise containing UserInStore for corresponding uid.
 */
async function getUserFromStore(uid: string): Promise<UserInStore | void | undefined> {
  return getDoc(usersRef(uid))
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
  onNext: (userFoodItem?: UserFoodItem) => void
): Promise<Unsubscribe> {
  const unsubFunc = onSnapshot(foodsRef(uid), (doc) => {
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

//-------------------Firestore Auth Methods-------------------
/**
 * Logs the user in.
 * 
 * @param email User's email.
 * @param password User's password.
 * @param success_callback Callback if successful login
 */
export const login = async(email: string, password: string, success_callback: (userCred: UserCredential) => void) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(success_callback)
}

/**
 * Registers new user
 * @param name 
 * @param email 
 * @param password 
 * @param success Callback if successful sign-up. 
 */
export const signUp = async (name: string, email: string, password: string, success?: (user: UserCredential) => void) => {
  await createUserWithEmailAndPassword(auth, email, password)
  .then(async (user: UserCredential) => {
    await addAuthenticatedUserAfterSignup({
      email: email,
      name: name,
    })
  .then(() => success?.(user))
  })
}

function getCurrentUserUid (): string | undefined {
  return auth.currentUser?.uid
}

//-------------------Firestore Storage Buckets Methods-------------------
export const uploadImage = async (uri: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const foodStorageRef = ref(storage, `${getCurrentUserUid()}/${uuid()}`)
    const usedRef = await uploadBytes(foodStorageRef, blob).then((snapshot) => {
      console.info('Uploaded Image!')
      return snapshot.ref
    })
    return await getDownloadURL(usedRef)
  } catch (err: any) {
    console.error('uploadImage error: ' + err.message); 
  }
}
