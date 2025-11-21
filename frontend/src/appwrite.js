import { Client, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // or your Appwrite URL
  .setProject("691e4321001bc4c98319");

export const databases = new Databases(client);
export const DATABASE_ID = "691e4363000ffe322c28";
export const COLLECTION_ID = "contact_submissions";
