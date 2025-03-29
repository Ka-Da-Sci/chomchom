import DefaultLayout from "../layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Image, Spinner } from "@heroui/react";
import ProfilePageUploads from "../layouts/ProfilePageUploads";
import { useAuthContext } from "@/hooks/useAuthContext";
import useFileManagementContext from "@/hooks/useFileManagementContext";
import MessagesMenu from "../layouts/MessagesMenu";
import MessagesMenuLanding from "../layouts/MessMessagesMenuLanding";
import { useNavigate } from "react-router-dom";

// /* eslint-disable no-console */
const Profile = () => {
    const { session } = useAuthContext();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { isLoading, contextLoaded, setIsLoading } = useFileManagementContext();
  const navigate = useNavigate();

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

  if (!session && contextLoaded) {
    navigate("/login");
    return null;
  };

  if ( session !== null && isLoading || !contextLoaded || !currentUser?.user_metadata.full_name || !currentUser?.updated_at) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="current" />
      </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-2 gap-y-1 sm:gap-y-4 rounded-sm shadow-lg px-4 sm:px-8 py-2 sm:py-4">
              <h3 className="font-semibold font-poppins antialiased text-sm sm:text-base text-default-900">Email:</h3>
              <p className="font-normal font-poppins antialiased text-sm sm:text-base text-default-600 break-all sm:col-span-2">{currentUser?.user_metadata.email}</p>
              <h3 className="mt-4 sm:mt-0 font-semibold font-poppins antialiased text-sm sm:text-base text-default-900">Last Login:</h3>
              <p className="font-normal font-poppins antialiased text-sm sm:text-base text-default-600 sm:col-span-2">{new Date(currentUser?.updated_at ?? "").toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
            </div>
          </div>

          <MessagesMenu>
            <MessagesMenuLanding />
          </MessagesMenu>
          
        </div>
        {/* <h1 className="text-left w-full capitalize text-2xl">Uploads</h1> */}
        <ProfilePageUploads />
      </div>
    </DefaultLayout>
  );
};

export default Profile;
