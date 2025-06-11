'use server';
import {db,auth} from "@/firebase/admin";
import { CollectionReference, DocumentData, Query } from "firebase-admin/firestore";
import {cookies} from "next/headers"



const OneWeek = 60 * 60 * 24 * 7 ;

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: OneWeek*1000, //7days
    });

    cookieStore.set('session', sessionCookie,{
        maxAge: OneWeek,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });

}

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;

    try {
        // check if user exists in db
        const userRecord = await db.collection("users").doc(uid).get();
        if (userRecord.exists)
            return {
                success: false,
                message: "User already exists. Please sign in.",
            };

        // save user to db
        await db.collection("users").doc(uid).set({
            name,
            email,
            // profileURL,
            // resumeURL,
        });

        return {
            success: true,
            message: "Account created successfully. Please sign in.",
        };
    } catch (error: any) {
        console.error("Error creating user:", error);

        // Handle Firebase specific errors
        if (error.code === "auth/email-already-exists") {
            return {
                success: false,
                message: "This email is already in use",
            };
        }

        return {
            success: false,
            message: "Failed to create account. Please try again.",
        };
    }
}




export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord)
            return {
                success: false,
                message: "User does not exist. Create an account.",
            };

        await setSessionCookie(idToken);
    } catch (error: any) {
        console.log("");

        return {
            success: false,
            message: "Failed to log into account. Please try again.",
        };
    }
}

export async function signOut() {
    const cookieStore = await cookies();

    cookieStore.delete("session");
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session")?.value;
    if (!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        // get user info from db
        const userRecord = await db.collection("users").doc(decodedClaims.uid).get();
        if (!userRecord.exists) return null;

        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    } catch (error) {
        console.log(error);

        // Invalid or expired session
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}

// export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
//     const interviewsRef: CollectionReference<DocumentData, DocumentData> = db.collection('interviews');
//     const query: Query<DocumentData> = interviewsRef
//         .where('userId', '==', userId)
//         .orderBy('createdAt', 'desc');
    
//     const interviews = await query.get();
    
//     return interviews.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//     })) as Interview[];
// }

export async function getInterviewsByUserId(userId: string): Promise<Interview[]> {
    const interviewsRef: CollectionReference<DocumentData, DocumentData> = db.collection('interviews');
    
    const query: Query<DocumentData, DocumentData> = interviewsRef
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc');

    const snapshot = await query.get();

    const interviews: Interview[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Interview, 'id'>)
    }));

    return interviews;
}


type GetLatestInterviewsParams = {
    userId: string;
    limit?: number;
};

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[]> {
    const { userId, limit = 20 } = params;
    const interviewsRef: CollectionReference<DocumentData, DocumentData> = db.collection('interviews');
    
    const query: Query<DocumentData, DocumentData> = interviewsRef
        .where('finalized', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(limit * 2); // Fetch more to allow for filtering

    const snapshot = await query.get();
    
    const filteredInterviews: Interview[] = snapshot.docs
        .map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<Interview, 'id'>)
        }))
        .filter(interview => interview.userId !== userId)
        .slice(0, limit);

    return filteredInterviews;
}

// export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[]> {
//     const { userId, limit = 20 } = params;

//     const interviewsRef: CollectionReference<DocumentData> = db.collection('interviews');

//     // Avoid using '!=' directly if possible — fallback to client-side filtering
//     const query: Query<DocumentData> = interviewsRef
//         .where('finalized', '==', true)
//         .orderBy('createdAt', 'desc')
//         .limit(limit); 

//     const snapshot = await query.get();

//     const filteredInterviews: Interview[] = snapshot.docs
//         .map(doc => ({
//             id: doc.id,
//             ...(doc.data() as Omit<Interview, 'id'>)
//         }))
//         .filter(interview => interview.userId !== userId)

//     return filteredInterviews;
// }