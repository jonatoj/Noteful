import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import NotefulError from "./NotefulError";

it("renders without crashing", () => {
  const wrapper = shallow(<NotefulError />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
