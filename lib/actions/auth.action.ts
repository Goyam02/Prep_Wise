'use server';
import {db} from "@/firebase/admin";

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