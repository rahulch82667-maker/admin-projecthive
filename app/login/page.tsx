import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import Card from "@/components/ui/Card";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[#fafafa] dark:bg-[#050505]">
      {/* Decorative background elements with brown/tan tones */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#7c4a32]/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#a67c52]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-[440px] z-10">
        <div className="flex flex-col items-center mb-1text-center">
          <div className="relative w-36 h-36 drop-shadow-2xl">
            <Image
              src="/images/Hive_logo.png"
              alt="ProjectHive Logo"
              fill
              sizes="(max-width: 768px) 100vw, 440px"
              className="object-contain scale-125"
              priority
            />
          </div>
        </div>
        <Card className="p-8 md:p-10">
          <LoginForm />
        </Card>
      </div>

      {/* Footer copyright */}
      <div className="absolute bottom-8 text-xs text-zinc-400 dark:text-zinc-600 tracking-wider uppercase font-medium">
        &copy; 2026 ProjectHive Admin System
      </div>
    </main>
  );
}
