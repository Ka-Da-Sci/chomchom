import DefaultLayout from "../layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { Image, Spinner } from "@heroui/react";
import useFileManagementContext from "@/hooks/useFileManagementContext";
import OtherUserSpecificPublicGallery from "../layouts/OtherUserSpecificPublicGallery";
import { useParams } from "react-router-dom";
import supabase from "@/lib/supabase.config";
import MessageBox from "../layouts/MessageBox";

/* eslint-disable no-console */
const ThirdPartyUserPublicProfile = () => {
  const [currentThirdPartyUser, setCurrentThirdPartyUser] = useState<{
    created_at: string | null;
    email: string | null;
    id: string | null;
    last_sign_in_at: string | null;
    raw_user_meta_data: {
      picture: string;
      full_name: string;
      avatar_url: string;
      email_verified: boolean;
    };
  }>();
  const { isLoading, contextLoaded, setIsLoading } = useFileManagementContext();
  const { userId } = useParams();
  const [currentUserId, setCurrentUserId] = useState<string>();

  useEffect(() => {
    const fetchCurrentUser = async() => {
        const currentUser = await supabase.auth.getUser();
        const currentUserId = currentUser.data.user?.id;
        // debugger;
        setCurrentUserId(currentUserId);
      };

      fetchCurrentUser();
  }, [])

  useEffect(() => {
    setIsLoading(true);
    const getCurrentThirdPartyUser = async () => {
      if (!userId) return;

      try {
        const { error, data } = await supabase
          .from("safe_profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) throw error;

        if (!data || data === undefined) {
          throw new Error("User not found!");
        }

        setCurrentThirdPartyUser(
          data as {
            created_at: string | null;
            email: string | null;
            id: string | null;
            last_sign_in_at: string | null;
            raw_user_meta_data: {
              picture: string;
              full_name: string;
              avatar_url: string;
              email_verified: boolean;
            };
          }
        );
      } catch {
        console.error("An error occurred while fetching the user");
      }
    };

    getCurrentThirdPartyUser();
    setIsLoading(false);
  }, [userId]);

  if (isLoading || !contextLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="current" />
      </div>
    );
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto flex flex-col gap-12 items-center justify-center mt-20">
        <div className="w-full flex justify-between gap-4">
          <div className="flex self-start items-start gap-4 flex-col sm:flex-row">
            <div className="flex items-center justify-center flex-col gap-4 rounded-sm shadow-lg px-4 sm:px-8 py-2 sm:py-4">
              <Image
                className="z-0 w-max h-max max-h-20 max-w-20 rounded-full"
                src={currentThirdPartyUser?.raw_user_meta_data.avatar_url}
              />
              <p className="font-normal font-poppins antialiased text-sm sm:text-base text-default-900">
                {currentThirdPartyUser?.raw_user_meta_data.full_name}
              </p>
            </div>
            <div className="overflow-auto grid grid-cols-1 sm:grid-cols-2 gap-y-1 sm:gap-y-4 rounded-sm shadow-lg px-4 sm:px-8 py-2 sm:py-4">
              <h3 className="font-semibold font-poppins antialiased text-sm sm:text-base text-default-900">
                Email:
              </h3>
              <p className="font-normal font-poppins antialiased text-sm sm:text-base text-default-600">
                {`******${currentThirdPartyUser?.email?.split("@")[1]}`}
              </p>
              <h3 className="mt-4 sm:mt-0 font-semibold font-poppins antialiased text-sm sm:text-base text-default-900">
                Joined:
              </h3>
              <p className="font-normal font-poppins antialiased text-sm sm:text-base text-default-600">
                {new Date(
                  currentThirdPartyUser?.created_at ?? ""
                ).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
          </div>

          <MessageBox senderId={ currentUserId ?? ""} receiverId={userId ?? ''}/>

        </div>
        {/* <h1 className="text-left w-full capitalize text-2xl">Uploads</h1> */}
        <OtherUserSpecificPublicGallery />
      </div>
    </DefaultLayout>
  );
};

export default ThirdPartyUserPublicProfile;
