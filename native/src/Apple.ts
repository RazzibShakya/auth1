import { Auth, Identity } from './Auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';

export class Apple extends Auth {
    async getIdentity(): Promise<Identity> {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        return {
            id: appleAuthRequestResponse.user,
            token: appleAuthRequestResponse.identityToken,
            profile: null
        }
    }

    async logout() {
        // await GoogleSignin.signOut();
    }

}