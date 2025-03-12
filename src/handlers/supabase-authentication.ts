import supabase from "@/lib/supabase.config";


/* eslint-disable no-console */
const authenticateUser = {
    signInWithGooglePopup: async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) {
            console.error("Login failed:", error.message);
        } 
    },
    signOutGoogle: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout failed:", error.message);
            return;
        }
        const { data } = await supabase.auth.getSession();
        console.log(data);
        return new Promise((resolve) => resolve(data.session));
    },
}
  
export default authenticateUser;
