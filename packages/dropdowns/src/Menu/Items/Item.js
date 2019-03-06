/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import StyledItem from '../../styled/items/StyledItem';
import useDropdownContext from '../../utils/useDropdownContext';
import useMenuContext from '../../utils/useMenuContext';

// eslint-disable-next-line react/prop-types
const Item = ({ value, disabled, component = StyledItem, ...props }) => {
  const {
    itemCharHashRef,
    itemToString,
    downshift: { selectedItem, highlightedIndex, getItemProps }
  } = useDropdownContext();
  const { itemIndexRef } = useMenuContext();

  if (disabled) {
    return React.createElement(component, {
      disabled,
      ...props
    });
  }

  if (!value) {
    throw new Error('All Item components require a `value` prop');
  }

  let firstCharacter = undefined;

  if (typeof value === 'string') {
    firstCharacter = value.toLowerCase()[0];
  } else {
    if (!itemToString) {
      throw new Error('The `itemToString` prop must be provided if non-string values are used.');
    }

    firstCharacter = itemToString(value).toLowerCase()[0];
  }

  if (firstCharacter && itemCharHashRef.current[firstCharacter] === undefined) {
    itemCharHashRef.current[firstCharacter] = itemIndexRef.current;
  }

  const isFocused = highlightedIndex === itemIndexRef.current;
  const isSelected = selectedItem === value;

  itemIndexRef.current++;

  return React.createElement(
    component,
    getItemProps({
      item: value,
      focused: isFocused,
      checked: isSelected,
      ...props
    })
  );
};

Item.propTypes = {
  value: PropTypes.any,
  disabled: PropTypes.bool
};

export default Item;
