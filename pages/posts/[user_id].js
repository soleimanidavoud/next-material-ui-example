import {
  CardActionArea,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setPosts } from "../../src/slices/postsSlice";
import { wrapper } from "../../src/store/store";

const useStyles = makeStyles((theme) => {
  return {
    postsContainer: { marginTop: 70, marginBottom: 70 },
    postPaper: { padding: 10, margin: 10 },
    postOwnerImg: { borderRadius: "50%" },
    typosContainer: { marginLeft: 10 },
    nameTypo: { fontSize: 16, fontWeight: 600 },
    emailTypo: { fontSize: 13, fontWeight: 300 },
    image: { marginTop: 10, borderRadius: 10 },
    textTypo: { marginTop: 10, fontWeight: 300, fontSize: 16 },
  };
});

const Posts = (props) => {
  const classes = useStyles();
  const { posts } = props;
  return (
    <Grid container className={classes.postsContainer}>
      {posts?.entities?.map((ent) => (
        <Grid item xs={12} md={4}>
          <Paper className={classes.postPaper}>
            <Grid container>
              <img
                src={ent?.owner?.picture}
                width={50}
                height={50}
                className={classes.postOwnerImg}
              />
              <Grid item className={classes.typosContainer}>
                <Typography className={classes.nameTypo}>
                  {ent?.owner?.firstName + " " + ent?.owner?.lastName}
                </Typography>

                <Typography className={classes.emailTypo}>
                  {ent?.owner?.email}
                </Typography>
              </Grid>
            </Grid>
            <img src={ent?.image} width="100%" className={classes.image} />

            <Typography className={classes.textTypo}>{ent?.text}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    await axios
      .get(`https://dummyapi.io/data/api/post?limit=10`, {
        headers: {
          "app-id": "5fedae858bccd37bf8555701",
        },
      })
      .then(async (response) => {
        await store.dispatch(setPosts(response.data.data));
      })
      .catch((error) => console.log(error));
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    setPosts: bindActionCreators(setPosts, dispatch),
  };
};

export default connect((state) => state, mapDispatchToProps)(Posts);
