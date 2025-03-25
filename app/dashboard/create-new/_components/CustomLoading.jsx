import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader className={"hidden"}>
          <AlertDialogTitle>Genarating Video</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex flex-col items-center justify-center my-10 space-y-5">
          <Image src="/progress.gif" alt="loading" width={100} height={100} />
          <h2>Generating your video... Do not refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
