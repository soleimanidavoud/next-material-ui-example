import {
  CardActionArea,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../src/components/Page";
import { setUsers } from "../src/slices/usersSlice";
import { wrapper } from "../src/store/store";
import Link from "../src/components/Link";

const useStyles = makeStyles((theme) => {
  return {
    row: { padding: 10 },
    avatar: { borderRadius: "50%" },
    rowsContainer: { paddingTop: 180, paddingBottom: 70 },
    typoContainer: { marginLeft: 10 },
    nameTypo: { fontSize: 18, fontWeight: 800 },
    emailTypo: { fontSize: 14, fontWeight: 300 },
    expand: { flexGrow: 1 },
    storiesContainer: {
      position: "fixed",
      top: 60,
      backgroundColor: "#f7f7f7",
      overflowY: "auto",
      zIndex: 10,
      padding: 5,
    },
    storyImg: {
      margin: 5,
      padding: 1,
      width: 70,
      height: 70,
      borderRadius: "50%",
      border: `2px ${theme.palette.primary.main} solid`,
    },
    story: {
      margin: 5,
      padding: 1,
      width: 70,
      height: 70,
      backgroundColor: "#eee",
      borderRadius: "50%",
    },
    addIcon: {
      fontSize: "2.4em",
    },
    storyTypo: {
      fontSize: "1em",
      fontWeight: 400,
      textOverflow: "ellipsis",
      width: 80,
    },
  };
});

const Messages = (props) => {
  const classes = useStyles();

  const { users } = props;

  return (
    <>
      <Grid container className={classes.storiesContainer} wrap="nowrap">
        <div>
          <Grid
            container
            className={classes.story}
            alignItems="center"
            justify="center"
          >
            <Add className={classes.addIcon} />
          </Grid>
          <Typography className={classes.storyTypo} noWrap align="center">
            Your story
          </Typography>
        </div>
        {users?.entities?.map((ent, index) => (
          <CardActionArea component={Link} href={`/profile/${ent.id}`} naked>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <img src={ent.picture} className={classes.storyImg} />

                <Typography className={classes.storyTypo} noWrap align="center">
                  {ent.firstName}
                </Typography>
              </Grid>
            </Grid>
          </CardActionArea>
        ))}
      </Grid>
      <Grid container justify="center" className={classes.rowsContainer}>
        {users?.entities?.map((ent, index) => (
          <CardActionArea component={Link} href={`/posts/${ent.id}`} naked>
            <Grid item xs={12} key={index} className={classes.row}>
              <Grid container>
                <img
                  src={ent.picture}
                  width={65}
                  height={65}
                  className={classes.avatar}
                />
                <Grid item className={classes.typoContainer}>
                  <Typography className={classes.nameTypo}>
                    {ent.firstName + " " + ent.lastName}
                  </Typography>

                  <Typography className={classes.emailTypo}>
                    {ent.email}
                  </Typography>
                </Grid>
                <div className={classes.expand} />

                <Typography className={classes.emailTypo}>
                  {ent.title}
                </Typography>
              </Grid>
            </Grid>
          </CardActionArea>
        ))}
      </Grid>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    await axios
      .get(`https://dummyapi.io/data/api/user?limit=10`, {
        headers: {
          "app-id": "5fedae858bccd37bf8555701",
        },
      })
      .then(async (response) => {
        await store.dispatch(setUsers(response.data.data));
      })
      .catch((error) => console.log(error));
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: bindActionCreators(setUsers, dispatch),
  };
};

export default connect((state) => state, mapDispatchToProps)(Messages);
