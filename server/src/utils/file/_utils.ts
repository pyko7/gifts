/* eslint-disable no-undef */

import { bucket } from '../../db/firebase'

const { STORAGE_PUBLIC_URL, FIREBASE_STORAGE_BUCKET } = process.env

//TODO: FIND A WAY TO PREVENT UPLOAD IF ERROR IN DRIZZLE DB CREATION
export const uploadAndGetFileUrl = async (
  file: File
): Promise<string | undefined> => {
  try {
    const destination = `uploads/${Date.now()}_${file.name}`
    const firebaseFile = bucket.file(destination)

    const writableStream = firebaseFile.createWriteStream({
      metadata: {
        contentType: file.type
      }
    })

    const fileBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(fileBuffer)

    writableStream.end(buffer)

    await new Promise((resolve, reject) => {
      writableStream.on('finish', () => {
        resolve(null)
      })
      writableStream.on('error', (error) => {
        console.error('Error uploading file:', error)
        reject(error)
      })
    })

    const publicUrl = `${STORAGE_PUBLIC_URL}/${FIREBASE_STORAGE_BUCKET}/${destination}`
    return publicUrl
  } catch (err) {
    console.error('[uploadAndGetFileUrl -  Upload failed:', err)
  }
}
