import { Button } from "@heroui/react";
import DefaultLayout from "../layouts/DefaultLayout";
import authenticateUser from "@/handlers/supabase-authentication";


const SignUpSignIn = () => {
  const { signInWithGooglePopup } = authenticateUser;



    return (
        <DefaultLayout>
          <div className="flex flex-col gap-8 justify-center items-center max-h-screen">
            <h1>You must be logged in!</h1>
            <Button
              className="capitalize px-8 font-poppins"
              onPress={async () => {
                await signInWithGooglePopup();
              }}
            >
              Login With Google
            </Button>
            <Button
              className="capitalize px-8 font-poppins"
              onPress={async () => {
                await signInWithGooglePopup();
              }}
            >
              Sign Up with Google
            </Button>
          </div>
        </DefaultLayout>
      );
}

export default SignUpSignIn;