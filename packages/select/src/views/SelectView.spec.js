/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { shallow } from 'enzyme';
import SelectView from './SelectView';

describe('SelectView', () => {
  it('renders default styling', () => {
    const wrapper = shallow(<SelectView />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders focus-inset styling if provided', () => {
    const wrapper = shallow(<SelectView focusInset />);

    expect(wrapper).toMatchSnapshot();
  });
});
