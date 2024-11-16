import { ChangeEvent, FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input, InputGroup } from "@chakra-ui/react";
import ErrorMessage from "@components/common/errorMessage/ErrorMessage";
import sxs from "../../_styles";
import { CloudArrowUpIcon } from "@components/common/icons";
import FileUpload from "@components/common/input/fileUpload/FileUpload";
import FileUploadPreview from "@components/common/input/fieldUploadPreview/FileUploadPreview";
import { CompleteProfileUseFormProps } from "../../completeProfileForm/_props";

const Picture: FC = () => {
  const { control, watch, setValue } =
    useFormContext<CompleteProfileUseFormProps>();
  const filePreview = watch("imageUrl");

  const handleChange = (e: ChangeEvent<HTMLInputElement>, onChange: any) => {
    if (e.target.files && e.target.files[0]) {
      const targetFile = e.target.files[0];

      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }

      const previewUrl = URL.createObjectURL(targetFile);
      setValue("imageUrl", previewUrl);
      onChange(targetFile);
    }
  };

  const handleClear = (onChange: any) => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    setValue("imageUrl", null);
    onChange(undefined);
  };

  return (
    <Controller
      name="picture"
      control={control}
      render={({ field: { onChange, onBlur, ref }, formState: { errors } }) => (
        <InputGroup sx={{ ...sxs.inputGroup, alignItems: "flex-start" }}>
          {!filePreview ? (
            <FileUpload
              label="Ajouter une image de profil"
              icon={<CloudArrowUpIcon />}
            />
          ) : (
            <FileUploadPreview
              mode="AVATAR"
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
