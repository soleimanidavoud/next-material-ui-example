import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../src/components/Page";
import { setPosts } from "../src/slices/PostsSlice";
import { wrapper } from "../src/store/store";

const Settings = (props) => {
  return <div>settings</div>;
};
export default Settings;
