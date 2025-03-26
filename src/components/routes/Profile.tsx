import DefaultLayout from "../layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Button, Image, Spinner } from "@heroui/react";
import ProfilePageUploads from "../layouts/ProfilePageUploads";
import authenticateUser from "@/handlers/supabase-authentication";
import { useAuthContext } from "@/hooks/useAuthContext";
import useFileManagementContext from "@/hooks/useFileManagementContext";
import Messages from "../layouts/MessagesMenu";

// /* eslint-disable no-console */
const Profile = () => {
    const { session } = useAuthContext();
  const { signInWithGooglePopup } = authenticateUser;
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { isLoading, contextLoaded, setIsLoading } = useFileManagementContext();

  useEffect(() => {
    if (!session) return;

    setIsLoading(true);
    const getCurrentUser = async () => {
      if (session) {
        const { user } = session;
        setCurrentUser(user);
      }
    };

    getCurrentUser();
    setIsLoading(false);
  }, [session]);

  if ( session !== null && isLoading || !contextLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="current" />
      </div>
    );
  }

  if (!session) {
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
            Sign in
          </Button>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="w-full mx-auto flex flex-col gap-12 items-center justify-center pt-4 pb-12">
        <div className="w-full flex justify-between gap-4">
          <div className="flex self-start items-start gap-4 flex-col sm:flex-row">
            <div className="flex items-center justify-center flex-col gap-4 rounded-sm shadow-lg px-4 sm:px-8 py-2 sm:py-4">
              <Image
                className="z-0 w-max h-max max-h-20 max-w-20 rounded-full"
                src={currentUser?.user_metadata.avatar_url}
              />
              <p className="font-normal font-poppins antialiased text-sm sm:text-base text-default-900">{currentUser?.user_metadata.full_name}</p>
            </div>
            <div className="overflow-auto grid grid-cols-1 sm:grid-cols-2 gap-y-1 sm:gap-y-4 rounded-sm shadow-lg px-4 sm:px-8 py-2 sm:py-4">
              <h3 className="font-semibold font-poppins antialiased text-sm sm:text-base text-default-900">Email:</h3>
              <p className="font-normal font-poppins antialiased text-sm sm:text-base text-default-600">{currentUser?.user_metadata.email}</p>
              <h3 className="mt-4 sm:mt-0 font-semibold font-poppins antialiased text-sm sm:text-base text-default-900">Last Login:</h3>
              <p className="font-normal font-poppins antialiased text-sm sm:text-base text-default-600">{new Date(currentUser?.updated_at ?? "").toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
            </div>
          </div>

          <Messages />


          
        </div>
        {/* <h1 className="text-left w-full capitalize text-2xl">Uploads</h1> */}
        <ProfilePageUploads />
      </div>
    </DefaultLayout>
  );
};

export default Profile;
