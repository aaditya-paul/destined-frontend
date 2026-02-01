import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { 
  GoogleAuthProvider, 
  signInWithCredential,
  UserCredential 
} from 'firebase/auth';
import { auth } from '@/config/firebase';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // TODO: Add your Google Client IDs
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

  const signInWithGoogle = async (): Promise<UserCredential | null> => {
    try {
      const result = await promptAsync();
      
      if (result?.type === 'success') {
        const { id_token } = result.params;
        
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        
        return userCredential;
      }
      
      return null;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  return {
    signInWithGoogle,
    request,
    response,
  };
};
