import { FC } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import sxs from "./_styles";
import { FormContainerProps } from "./_props";
import { Link } from "react-router-dom";

const FormContainer: FC<FormContainerProps> = ({
  children,
  title,
  subtitle = "",
  buttonName,
  redirectLinks,
  onCancel,
  onSave,
}) => (
  <Flex alignItems="center" justifyContent="center" sx={sxs.container}>
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      gap={5}
      sx={sxs.innerContainer}
    >
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        sx={sxs.textContainer}
      >
        <Text sx={sxs.title}>{title}</Text>
        <Text sx={sxs.subtitle}>{subtitle}</Text>
      </Flex>

      {children}

      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="0.75rem"
        sx={sxs.textContainer}
      >
        {Boolean(onCancel) && (
          <Button variant="ghost" sx={sxs.cancelButton}>
            Annuler
          </Button>
        )}

        {buttonName && <Button onClick={onSave}>{buttonName}</Button>}

        {redirectLinks?.map((redirect, idx) => (
          <Link key={idx} to={`/${redirect.url}`}>
            {redirect.label}
          </Link>
        ))}
      </Flex>
    </Flex>
  </Flex>
);

export default FormContainer;
