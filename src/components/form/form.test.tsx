import React from 'react';
import renderer from 'react-test-renderer';
import { Form } from './form'
import { Field, Input } from './../../components';

const fields = [
  {
    type: 'text',
    name: 'login',
    label: 'Логин',
  },
  {
    type: 'password',
    name: 'password',
    label: 'Пароль',
  },
];

test('Form renders correctly', () => {
  const tree = renderer
    .create(
      <Form
        onSubmit={() => {
          console.log();
        }}
        submitButtonText='Сохранить'
        title='Авторизация'
      >
        {fields.map((field) => (
          <Field
            key={field.name}
            label={field.label}
          >
            <Input
              type={field.type}
              name={field.name}
            />
          </Field>
        ))}
      </Form>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
