import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";

//Reach router
import { Link as ReachLink } from "@reach/router";

//Dayjs for time formatting
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//useFetch
import useFetch from "use-http";

//Chakra UI
import {
  Heading,
  Box,
  Text,
  Image,
  Link,
  Badge,
  Stack,
  Icon
} from "@chakra-ui/core";

const ContentList = ({ googleId }) => {
  //let sneak this in here
  dayjs.extend(relativeTime);

  const [videoData, setVideoData] = useState();
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };
  const { get, loading, error, data, response } = useFetch(
    `https://udemic-server.herokuapp.com`
  );

  useEffect(() => {
    async function fetchData() {
      let newData;
      if (googleId !== undefined) {
        newData = await get(`/videos?createdBy=${googleId}`);
      }
      if (response.ok) setVideoData(newData);
    }
    fetchData();
  }, [googleId]);

  console.log(data, response);

  return (
    <Box>
      {loading ? (
        "loading"
      ) : videoData !== undefined ? (
        JSON.stringify(videoData) === JSON.stringify([]) ? (
          "You have no content"
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
                instructorName
              }) => (
                <Box
                  p={4}
                  display={{ md: "flex" }}
                  borderWidth="1px"
                  rounded="lg"
                >
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
                      to="/lord knows"
                    >
                      {title}
                    </Link>
                    <Stack isInline pt={4} spacing={{ md: 5 }}>
                      <Box display="flex">
                        <Icon name="time" mr={1} />
                        <Text lineHeight={1}>{dayjs(createdAt).fromNow()}</Text>
                      </Box>
                      <Box display="flex">
                        <Icon name="star" color="yellow.200" mr={1} />
                        <Text lineHeight={1}>{`(${starsCount})`}</Text>
                      </Box>
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
        )
      ) : (
        "nothing to show"
      )}
    </Box>
  );
};

const Dashboard = ({ googleId }) => {
  return (
    <Box mx="auto" maxWidth={{ base: "90%", md: "52rem" }}>
      <Heading mt={{ base: "30px", md: "50px" }}>Dashboard</Heading>
      <Text>Welcome to your dashboard</Text>
      <ContentList googleId={googleId} />
    </Box>
  );
};

const mapStateToProps = state => ({
  googleId: state.user.credentials.googleId
});

export default connect(mapStateToProps)(Dashboard);
