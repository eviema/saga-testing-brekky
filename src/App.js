import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { fetchUsers, fetchUserById } from "./actions";

const styles = {
  userCard: {
    margin: 16
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

const App = props => {
  const {
    // variables
    classes,
    users,
    currentUser,
    // error,
    // function
    fetchUsers,
    fetchUserById
  } = props;

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Grid container>
      {users.map(user => {
        return (
          <Grid item xs={6}>
            <Card
              className={classes.userCard}
              onClick={() => fetchUserById(user.id)}
            >
              <CardMedia
                className={classes.media}
                image={`assets/${user.id}.jpeg`}
                title={user.name}
              />
              <CardContent>
                <Typography
                  variant={user.id === currentUser.id ? "title" : "subtitle1"}
                >
                  {user.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

function mapStateToProps({ userReducer: { users, currentUser, error } }) {
  return { users, currentUser, error };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserById, fetchUsers }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
