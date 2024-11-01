/* eslint-disable no-undef */

import { bucket } from '../../db/firebase'
import { UploadAndGetFile } from './_types'

export const uploadAndGetFile = async (
  file: File
): Promise<UploadAndGetFile | undefined> => {
  try {
    const fileName = `${Date.now()}_${file.name}`
    const destination = `uploads/${fileName}`
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

    const twoYears = new Date().setFullYear(new Date().getFullYear() + 2)

    const [signedUrl] = await firebaseFile.getSignedUrl({
      action: 'read',
      expires: twoYears
    })
    const uploadedFile = {
      name: fileName,
      url: signedUrl
    }
    return uploadedFile
  } catch (err) {
    console.error('[uploadAndGetFileUrl -  Upload failed:', err)
  }
}

export const deleteFile = async (fileUrl: string | null) => {
  try {
    await bucket.deleteFiles({
      prefix: `uploads/${fileUrl}`
    })
  } catch (error) {
    console.error('[deleteFile -  Deletion  failed:', error)
  }
}
