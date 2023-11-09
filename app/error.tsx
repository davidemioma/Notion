"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <Image
        className="dark:hidden"
        src="/error.png"
        height="300"
        width="300"
        alt="Error"
      />

      <Image
        className="hidden dark:block"
        src="/error-dark.png"
        height="300"
        width="300"
        alt="Error"
      />

      <h2 className="text-xl font-medium">Something went wrong!</h2>

      <Button asChild>
        <Link href="/documents">Go back</Link>
      </Button>
    </div>
  );
};

export default Error;
