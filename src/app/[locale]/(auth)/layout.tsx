import Header from "@/components/shared/Header/Header";
import LanguageSwitcher from "@/components/shared/Header/LanguageSwitcher";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Header/>
       <div className="bg-muted flex min-h-screen items-center justify-center">
      {/* Language Switcher – appears on all auth pages */}
     

      {/* Your centered card */}
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
    </>
 
  );
}