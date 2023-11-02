"use client";

import Image from "next/image";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function Documents() {
  const router = useRouter();

  const { user } = useUser();

  const createDocument = useMutation(api.documents.createDocument);

  const onCreateHandler = () => {
    const promise = createDocument({ title: "Untitled" }).then((id) =>
      router.push(`/documents/${id}`)
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <Image
        className="dark:hidden"
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
      />

      <Image
        className="hidden dark:block"
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
      />

      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>

      <Button onClick={onCreateHandler}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
}
