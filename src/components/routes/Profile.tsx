import DefaultLayout from "../layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Button, Image } from "@heroui/react";
import ProfilePageUploads from "../layouts/ProfilePageUploads";
import authenticateUser from "@/handlers/supabase-authentication";
import { useAuthContext } from "@/hooks/useAuthContext";

// /* eslint-disable no-console */
const Profile = () => {
    const { session } = useAuthContext();
  const { signInWithGooglePopup } = authenticateUser;
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (session) {
        const { user } = session;
        setCurrentUser(user);
      }
    };

    getCurrentUser();
  }, [session]);

  if (!session) {
    return (
      <DefaultLayout>
        <div className="flex flex-col gap-8 justify-center items-center h-3/4 max-h-screen">
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
      <div className="container mx-auto flex flex-col gap-12 items-center justify-center mt-20">
        <div className="flex self-start items-start gap-4">
          <div className="rounded-sm shadow-lg px-8 py-4">
            <Image
              className="w-max h-max max-h-20 max-w-20 rounded-full"
              src={currentUser?.user_metadata.avatar_url}
            />
            <p>{currentUser?.user_metadata.full_name}</p>
          </div>
          <div className="grid grid-cols-2 gap-y-6 rounded-sm shadow-lg px-8 py-4">
            <h3>Email:</h3>
            <p>{currentUser?.user_metadata.email}</p>
            <h3>Last Login:</h3>
            <p>{currentUser?.updated_at?.split("T")[0]}</p>
          </div>
        </div>
        {/* <h1 className="text-left w-full capitalize text-2xl">Uploads</h1> */}
        <ProfilePageUploads />
      </div>
    </DefaultLayout>
  );
};

export default Profile;
