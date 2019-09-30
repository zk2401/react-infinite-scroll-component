import * as React from "react";
import { storiesOf } from "@storybook/react";

import WindowInf from "./WindowInfiniteScrollComponent";
const stories = storiesOf("Components", module);

stories.add("InfiniteScroll", () => <WindowInf />, {
  info: { inline: true }
});
