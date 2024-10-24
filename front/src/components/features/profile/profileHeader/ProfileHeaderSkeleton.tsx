import { Flex, SkeletonText } from "@chakra-ui/react";
import sxs from "./_styles";

const ProfileHeaderSkeleton = () => (
  <Flex sx={sxs.profileHeaderTextContainer}>
    <SkeletonText noOfLines={1} minWidth="7rem" skeletonHeight="5" />
    <SkeletonText
      mt="0.5rem"
      noOfLines={1}
      minWidth="4rem"
      skeletonHeight="4"
    />
  </Flex>
);

export default ProfileHeaderSkeleton;
