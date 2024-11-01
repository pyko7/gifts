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
  const { control } = useFormContext<GiftFormProps>();
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, onChange: any) => {
    if (e.target.files && e.target.files[0]) {
      const targetFile = e.target.files[0];

      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }

      const previewUrl = URL.createObjectURL(targetFile);
      setFilePreview(previewUrl);

      onChange(targetFile);
    }
  };

  const handleClear = (onChange: any) => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    setFilePreview(undefined);
    onChange(undefined);
  };

  return (
    <Controller
      name="picture"
      control={control}
      render={({ field: { onChange, onBlur, ref }, formState: { errors } }) => (
        <InputGroup sx={{ ...sxs.inputGroup, alignItems: "flex-start" }}>
          {!filePreview ? (
            <FileUpload label="Ajouter une image" icon={<CloudArrowUpIcon />} />
          ) : (
            <FileUploadPreview
              filePreview={filePreview}
              onClear={() => handleClear(onChange)}
            />
          )}
          <Input
            id="picture"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handleChange(e, onChange)}
            onBlur={onBlur}
            ref={ref}
            sx={{ display: "none" }}
          />
          {errors.picture?.message && (
            <ErrorMessage message={String(errors.picture?.message)} />
          )}
        </InputGroup>
      )}
    />
  );
};

export default Picture;