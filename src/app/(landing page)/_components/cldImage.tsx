"use client";

import {
  CldImage,
  type CldImageProps,
  CldUploadWidget,
  type CldUploadWidgetProps,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { Button } from "~/components/ui/button";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

import Link from "next/link";

export function CloudImage({ ...props }: CldImageProps) {
  return <CldImage {...props} dpr={"auto"} />;
}

type uploadWidget = {
  minimize: () => null;
};

export function CloudUpload({ ...props }: CldUploadWidgetProps) {
  const [url, setUrl] = useState("");
  return (
    <CldUploadWidget
      {...props}
      signatureEndpoint="/api/cloudinary/widget"
      onSuccess={(result, { widget }: { widget: uploadWidget }) => {
        const info = result.info as CloudinaryUploadWidgetInfo;
        setUrl(info.secure_url);
        widget.minimize();
      }}
    >
      {({ open }) => {
        return (
          <div>
            <Button onClick={() => open()}>Envie uma imagem</Button>
            <AlertDialog open={url.length != 0}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Link da última imagem enviada
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Quando fechar esse alerta, ele não mostrará o link para a
                    última imagem. Contudo, ainda é possível procurar o link no
                    site da
                    <Link
                      className="ml-1 text-blue-500 transition duration-300 ease-linear hover:text-blue-950"
                      href={"https://cloudinary.com/"}
                    >
                      Cloudinary.
                    </Link>{" "}
                    O link da imagem é:{" "}
                    <p className="text-bold text-red-600">{url}</p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    onClick={() => {
                      setUrl("");
                    }}
                  >
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
