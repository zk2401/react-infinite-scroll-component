import React from "react";

import { storiesOf } from "@storybook/react";

import InfiniteScrollOnBody from "../examples/InfiniteScrollOnbody";

storiesOf("Infinite Scroll", module).add("body/window scroll", () => (
  <InfiniteScrollOnBody />
));
