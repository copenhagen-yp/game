import React from 'react';
import renderer from 'react-test-renderer';
import { Field } from './field';
import { Input } from '../../components';

test('Field renders correctly', () => {
  const tree = renderer
    .create(<Field>
      <Input
        type='password'
        name='password'
      />
    </Field>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
