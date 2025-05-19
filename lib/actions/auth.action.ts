'use server';
import {db,auth} from "@/firebase/admin";
import {cookies} from "next/headers"

export async function signUp(params: SignUpParams){
    const {uid, name, email, password} = params;

    try{
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists){
            return{
                success: false,
                message: 'User already exists.Please Sign In instead.'
            }
        }

        await db.collection('users').doc(uid).set({
            name,email
        })

    } catch(e:any){
        console.error('Error creating a User.',e);

        if(error.code === 'auth/email-already-exists'){
            return{
                success: false,
                message: 'Email already exists'
            }
        }
        return{
            success: false,
            message: 'Failed to create a User.'
        }
    }

}

const OneWeek = 60 * 60 * 24 * 7 ;

export async function setSectionCookie(idToken: string){
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

export async function signIn(params: SignInParams){
    const {email, idToken} = params;

    try{
        const userRecord = await auth.verifyIdToken(email);
        if(!!userRecord){
            return{
                success: false,
                message: 'User does not exist. Create an account instead.'
            }
        }

        await setSectionCookie(idToken);
    }catch (e) {
        console.error(e);
        return{
            success: false,
            message: 'Failed to log in to your account.'
        }

    }
}