import DefaultNavbar from "../components/navbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full max-w-[1440px] mx-auto flex flex-col h-screen font-poppins">
      <DefaultNavbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-4">
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
