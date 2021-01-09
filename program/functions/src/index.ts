import * as functions from "firebase-functions";

import * as admin from 'firebase-admin';

admin.initializeApp();

export const example =
    functions
        .region('asia-northeast1')
        .https
        .onCall((data, context) => {
            if (!context.auth) {
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    'The function must be called while authenticated.'
                );
            }
            functions.logger.log(data, { structuredData: true });
            return { message: 'Hello world from Firebase!' };
        });
