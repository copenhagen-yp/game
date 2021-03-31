import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from './button';

test('Button renders correctly', () => {
  const tree = renderer
    .create(<Button>Click Me!</Button>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
