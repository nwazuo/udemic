import React from "react";
import PropTypes from "prop-types";

//Reach router
import { Link as ReachLink } from "@reach/router";

//DayJS for time formatting
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//Chakra UI
import {
  Box,
  Text,
  Image,
  Link,
  Badge,
  Stack,
  Icon,
  Button
} from "@chakra-ui/core";

//Components
import StarButton from "./StarButton";
import FavoriteButton from "./FavoriteButton";

const VideoCard = ({ videoData, loading }) => {
  //let sneak this in here
  dayjs.extend(relativeTime);

  console.log(videoData);
  return (
    <Box>
      {loading ? (
        "loading"
      ) : JSON.stringify(videoData) === JSON.stringify([]) ? (
        "No videos to show here, sorry!"
      ) : (
        <Stack mt={6}>
          {videoData.map(
            ({
              id,
              videoUrl,
              createdAt,
              starsCount,
              thumbnail,
              category,
              title,
              instructorName,
              description,
              createdBy
            }) => (
              <Box
                p={4}
                display={{ md: "flex" }}
                borderWidth="1px"
                rounded="lg"
                position="relative"
              >
                <FavoriteButton
                  video={{
                    id,
                    videoUrl,
                    createdAt,
                    starsCount,
                    thumbnail,
                    category,
                    title,
                    instructorName,
                    description,
                    createdBy
                  }}
                />
                <Box flexShrink="0">
                  <Image
                    rounded="lg"
                    width={{ base: "100%", md: 40 }}
                    objectFit="cover"
                    src={thumbnail}
                    alt={title}
                  />
                </Box>
                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                  <Badge fontSize="0.8em" variantColor="green">
                    {category}
                  </Badge>
                  <Link
                    as={ReachLink}
                    mt={1}
                    display="block"
                    fontSize="lg"
                    lineHeight="normal"
                    fontWeight="semibold"
                    to={`/video/${id}`}
                  >
                    {title}
                  </Link>
                  <Stack isInline pt={4} spacing={{ base: 3, md: 5 }}>
                    <Box display="flex">
                      <Icon name="time" mr={1} />
                      <Text lineHeight={1}>{dayjs(createdAt).fromNow()}</Text>
                    </Box>
                    <StarButton
                      video={{
                        id,
                        videoUrl,
                        createdAt,
                        starsCount,
                        thumbnail,
                        category,
                        title,
                        instructorName,
                        description,
                        createdBy
                      }}
                    />
                    <Box display="flex">
                      <Icon name="info-outline" mr={1} />
                      <Text lineHeight={1} fontWeight="semibold">
                        {instructorName}
                      </Text>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            )
          )}
        </Stack>
      )}
    </Box>
  );
};

export default VideoCard;
