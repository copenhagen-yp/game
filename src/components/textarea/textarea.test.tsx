import React from 'react';
import renderer from 'react-test-renderer';
import { Textarea } from './textarea';

test('Input renders correctly', () => {
  const tree = renderer
    .create(<
      Textarea
      name='message'
      type='text'
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
