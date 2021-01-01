import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Message, Person, Settings } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import Link from "../Link";

const useStyles = makeStyles({
  root: { width: "100%", position: "fixed", bottom: 0 },
});

export const BottomNavigationLayout = (_) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("messages");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Profile"
        value="profile"
        component={Link}
        href="/profile"
        naked
        icon={<Person />}
      />
      <BottomNavigationAction
        label="Messages"
        value="messages"
        component={Link}
        href="/messages"
        naked
        icon={<Message />}
      />
      <BottomNavigationAction
        label="Settings"
        value="settings"
        component={Link}
        href="/settings"
        naked
        icon={<Settings />}
      />
    </BottomNavigation>
  );
};
