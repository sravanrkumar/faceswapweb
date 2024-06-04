import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { ALLOWED_IMAGE_TYPES, FILE_SIZE_LIMIT_MB } from "@/constants/imageType";

export interface ImageUploadPreviewProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  buttonLabel: string;
  removeLabel: string;
  previewShape: "square" | "rectangle";
  defaultValue?: string;
  isLoading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
}

const ImagesUploadPreview = React.forwardRef<
  HTMLInputElement,
  ImageUploadPreviewProps
>(
  (
    {
      id,
      buttonLabel,
      removeLabel,
      previewShape,
      defaultValue,
      isLoading,
      register,
      setValue,
      ...props
    },
    ref,
  ) => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    useEffect(() => {
      if (defaultValue) setPreviewUrl(defaultValue.toString());

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      const fileList = target.files;

      if (!fileList) return;

      const validImageTypes = ALLOWED_IMAGE_TYPES;

      const filteredFiles = Array.from(fileList).filter((file) =>
        validImageTypes.includes(file.type),
      );

      if (filteredFiles.length > 0) {
        setFile(filteredFiles[0]);
      }
    };

    const removeImage = () => {
      setFile(null);
      setPreviewUrl("");
      setValue(id, "", { shouldDirty: true });
    };

    return (
      <div>
        <div className="w-full">
          <div
            className={`h-[20px] relative items-center group ${
              !file && !previewUrl ? "" : "opacity-0"
            }`}
          >
            <label className="w-full h-full absolute z-1">
              <p
                className={`text-sm text-blue-350 group-hover:underline ${
                  !file && !previewUrl ? "group-hover:cursor-pointer" : ""
                } `}
              >
                {buttonLabel}
              </p>
              <input
                {...props}
                type="file"
                onChangeCapture={handleFile}
                accept=".jpg,.jpeg,.png"
                className="w-full h-full opacity-0 z-10 absolute curs"
                multiple={false}
                ref={ref}
                {...register(id, {
                  required:
                    file || previewUrl ? false : "This image is required.", // Set required to false if there is a default value
                  validate: {
                    acceptedFormats: (files: File[] | string) => {
                      if (!files || !files[0] || typeof files === "string") {
                        return true;
                      }
                      return (
                        ALLOWED_IMAGE_TYPES.includes(files[0]?.type) ||
                        "Only PNG, JPEG and JPG"
                      );
                    },
                    lessThan5MB: (files: File[]) => {
                      if (
                        files &&
                        files[0]?.size > FILE_SIZE_LIMIT_MB * 1024 * 1024
                      )
                        return `File size should not exceed ${FILE_SIZE_LIMIT_MB}MB`;
                      return true;
                    },
                  },
                })}
              />
            </label>
          </div>

          {(file || previewUrl) && (
            <div>
              <div
                className={`relative w-[8rem] ${
                  previewShape === "square" ? "h-[8rem]" : "h-[4.5rem]"
                }`}
              >
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : previewUrl
                        ? previewUrl
                        : ""
                  }
                  alt={`preview`}
                />
              </div>
              <Button
                type="button"
                className="p-0 hover:bg-transparent border-0 text-sm font-normal hover:underline text-blue-350 mt-6"
                variant={"outline"}
                onClick={removeImage}
              >
                {removeLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  },
);

ImagesUploadPreview.displayName = "ImagesUploadPreview";

export default ImagesUploadPreview;
