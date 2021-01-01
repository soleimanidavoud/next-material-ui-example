import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setProfile } from "../../src/slices/profileSlice";
import { wrapper } from "../../src/store/store";

const useStyles = makeStyles((theme) => {
  return {
    profileContainer: { marginTop: 70 },
    profilePaper: { padding: 10 },
    profileImage: { borderRadius: 10 },
    typosContainer: { padding: 10 },
    idTypo: { fontSize: 15, fontWeight: 300 },
    nameTypo: { fontSize: 21, fontWeight: 800 },
    titleTypo: { fontSize: 16, fontWeight: 800 },
    valueTypo: { fontSize: 16, fontWeight: 300, marginLeft: 10 },
  };
});

const Profile = (props) => {
  const classes = useStyles();
  const { profile } = props;

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    <Grid container justify="center" className={classes.profileContainer}>
      <Grid item xs={12} md={8}>
        <Paper className={classes.profilePaper}>
          <Grid container>
            <img
              src={profile?.entities?.picture}
              width={250}
              height={250}
              className={classes.profileImage}
            />

            <Grid item className={classes.typosContainer}>
              <Typography className={classes.idTypo}>
                {profile?.entities?.id}
              </Typography>
              <Typography className={classes.nameTypo}>
                {profile?.entities?.title +
                  " " +
                  profile?.entities?.firstName +
                  " " +
                  profile?.entities?.lastName}
              </Typography>
              <Grid container style={{ marginTop: 30 }}>
                <Typography className={classes.titleTypo}>Gender:</Typography>
                <Typography className={classes.valueTypo}>
                  {profile?.entities?.gender}
                </Typography>
              </Grid>

              <Grid container>
                <Typography className={classes.titleTypo}>
                  Date Of Birth:
                </Typography>
                <Typography className={classes.valueTypo}>
                  {profile?.entities?.dateOfBirth}
                </Typography>
              </Grid>

              <Grid container>
                <Typography className={classes.titleTypo}>
                  Register Date:
                </Typography>
                <Typography className={classes.valueTypo}>
                  {profile?.entities?.registerDate}
                </Typography>
              </Grid>

              <Grid container>
                <Typography className={classes.titleTypo}>Email:</Typography>
                <Typography className={classes.valueTypo}>
                  {profile?.entities?.email}
                </Typography>
              </Grid>
              <Grid container>
                <Typography className={classes.titleTypo}>Phone:</Typography>
                <Typography className={classes.valueTypo}>
                  {profile?.entities?.phone}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    await axios
      .get(`https://dummyapi.io/data/api/user/${params.user_id}`, {
        headers: {
          "app-id": "5fedae858bccd37bf8555701",
        },
      })
      .then(async (response) => {
        await store.dispatch(setProfile(response.data));
      })
      .catch((error) => console.log(error));
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    setProfile: bindActionCreators(setProfile, dispatch),
  };
};

export default connect((state) => state, mapDispatchToProps)(Profile);
