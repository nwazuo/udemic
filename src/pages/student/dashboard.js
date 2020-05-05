import React from "react";
import { Heading } from "@chakra-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Dashboard = ({ user }) => {
  return (
    <Heading>
      Welcome to dashboard 2020 {JSON.stringify(user.credentials)}
    </Heading>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  user: state.user
});

export default connect(mapStatetoProps)(Dashboard);
