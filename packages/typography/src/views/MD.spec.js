/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { mountWithTheme } from '@zendeskgarden/react-testing';
import MD from './MD';

describe('MD', () => {
  const Example = props => <MD {...props}>Hello world</MD>;

  it('applies correct styling by default', () => {
    const wrapper = mountWithTheme(<Example />);

    expect(wrapper).toMatchSnapshot();
  });

  it('applies correct styling with RTL locale', () => {
    const wrapper = mountWithTheme(<Example />, { rtl: true });

    expect(wrapper).toMatchSnapshot();
  });
});
