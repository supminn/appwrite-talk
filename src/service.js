import { account, databases } from "./client";
import {
  APPWRITE_DATABASE_ID,
  COLLECTION_MESSAGES,
  COLLECTION_ROOMS,
} from "./constants";
import { createToastError, createToastSuccess } from "./utils";

export const createAccount = async () => {
  try {
    await account.createAnonymousSession();
  } catch (error) {
    createToastError(error.message);
  }
};

export const getAccount = async (silent = true) => {
  try {
    let response = await account.get();
    return response;
  } catch (error) {
    if (!silent) {
      createToastError(error.message);
    }
  }
};

export const createRoom = async (roomId, caller) => {
  try {
    let response = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      COLLECTION_ROOMS,
      roomId,
      {
        caller,
      }
    );
    return response;
  } catch (err) {
    createToastError(err.message);
  }
};

export const updateRoom = async (roomId, caller, callee, silent = true) => {
  try {
    let res = await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      COLLECTION_ROOMS,
      roomId,
      {
        caller,
        callee,
      }
    );
    return res;
  } catch (err) {
    createToastError(err.message);
  }
};

export const getMessages = async (queries) => {
  try {
    let res = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      COLLECTION_ROOMS,
      queries
    );
    return res;
  } catch (err) {
    createToastError(err.message);
  }
};

export const getRoom = async (roomId) => {
  try {
    let res = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      COLLECTION_ROOMS,
      roomId
    );
    return res;
  } catch (err) {
    createToastError(err.message);
  }
};

export const sendToServer = async (message) => {
  try {
    let payload = JSON.stringify(message.payload);
    let res = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      COLLECTION_MESSAGES,
      "unique()",
      { ...message, payload }
    );
    return res;
  } catch (err) {
    createToastError(err.message);
  }
};
