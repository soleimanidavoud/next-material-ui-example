import { wrapper } from "../src/store/store";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/components/theme";
import { BottomNavigationLayout } from "../src/components/layouts/BottomNavigationLayout";
import { Grid, makeStyles } from "@material-ui/core";
import { AppbarLayout } from "../src/components/layouts/AppbarLayout";

const useStyles = makeStyles((theme) => {
  return {};
});

const WrappedApp = ({ Component, pageProps }) => {
  const classes = useStyles();
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Test project</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppbarLayout />
        <Component {...pageProps} />
        <BottomNavigationLayout />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default wrapper.withRedux(WrappedApp);
