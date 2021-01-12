import React from 'react';
import renderer from 'react-test-renderer';
import { Input } from './input';

test('Input renders correctly', () => {
  const tree = renderer
    .create(<
      Input
      name='password'
      type="text"
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
