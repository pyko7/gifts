import { ChangeEvent, FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup } from "@chakra-ui/react";
import ErrorMessage from "@components/common/errorMessage/ErrorMessage";
import sxs from "../../_styles";
import { GiftFormProps } from "../_props";
import CloudArrowUpIcon from "@components/common/icons/CloudArrowUpIcon";
import FileUpload from "@components/common/input/fileUpload/FileUpload";
import FileUploadPreview from "@components/common/input/fieldUploadPreview/FileUploadPreview";

const Picture: FC = () => {
  const { setValue } = useFormContext<GiftFormProps>();
  //use context instead
  const [file, setFile] = useState<File | undefined>(undefined);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const targetFile = e.target.files[0];
      const previewUrl = URL.createObjectURL(targetFile);
      setFile(targetFile);
      setFilePreview(previewUrl);
    }
  };

  const handleClear = () => {
    setFilePreview(undefined);
    setValue("picture", "");
  };

  return (
    <>
      <Controller
        name="picture"
        rules={{}}
        render={({ field, formState: { errors } }) => (
          <InputGroup sx={{ ...sxs.inputGroup, alignItems: "flex-start" }}>
            {!filePreview ? (
              <FileUpload
                label="Ajouter une image"
                icon={<CloudArrowUpIcon />}
              />
            ) : (
              <FileUploadPreview
                filePreview={filePreview}
                onClear={handleClear}
              />
            )}
            <Input
              id="picture"
              type="file"
              accept=".jpg, .jpeg, .png"
              {...field}
              onChange={handleChange}
              sx={{ display: "none" }}
            />
            {errors.name?.message && (
              <ErrorMessage message={String(errors.name?.message)} />
            )}
          </InputGroup>
        )}
      />
    </>
  );
};

export default Picture;
