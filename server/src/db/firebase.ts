/* eslint-disable no-undef */
import * as admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import 'dotenv/config'

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL
} = process.env

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    projectId: FIREBASE_PROJECT_ID
  }),
  storageBucket: FIREBASE_STORAGE_BUCKET
})

export const bucket = admin.storage().bucket()
export const db = getFirestore()
