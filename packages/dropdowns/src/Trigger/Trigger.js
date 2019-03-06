/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Reference } from 'react-popper';
import { KEY_CODES } from '@zendeskgarden/react-selection';
import useDropdownContext from '../utils/useDropdownContext';

const StyledTrigger = styled.div`
  display: inline-block;
`;

const StyledHiddenInput = styled.input`
  position: relative;
  left: -100px;
  transform: scale(0);
  opacity: 0;
  outline: 0;
  border-width: 0;
  border-style: initial;
  border-color: initial;
  background: 0 center;
  padding: 0;
  width: 1px;
  color: transparent;
  font-size: inherit;
  border-image: initial;
`;

const Trigger = ({ children, ...props }) => {
  const {
    itemCharHashRef,
    previousIndexRef,
    nextItemsHashRef,
    downshift: {
      getToggleButtonProps,
      getInputProps,
      isOpen,
      setHighlightedIndex,
      highlightedIndex,
      selectItemAtIndex,
      selectHighlightedItem,
      openMenu
    }
  } = useDropdownContext();
  const hiddenInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      hiddenInputRef.current && hiddenInputRef.current.focus();
    }
  }, [isOpen]);

  const getTriggerProps = triggerProps => {
    return getToggleButtonProps({
      'aria-label': undefined,
      ...triggerProps
    });
  };

  return (
    <Reference>
      {({ ref }) => (
        <>
          <StyledTrigger innerRef={ref} {...props}>
            {children && children({ getTriggerProps, isOpen })}
          </StyledTrigger>
          <StyledHiddenInput
            {...getInputProps({
              readOnly: true,
              tabIndex: -1,
              innerRef: hiddenInputRef,
              value: '',
              onKeyDown: e => {
                if (isOpen) {
                  if (e.keyCode === KEY_CODES.TAB) {
                    e.preventDefault();
                    e.stopPropagation();

                    selectHighlightedItem();
                  }

                  const isAlphaNumericKey =
                    (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90);

                  if (isAlphaNumericKey) {
                    const matchingItemIndex = itemCharHashRef.current[e.key.toLowerCase()];

                    if (matchingItemIndex !== undefined) {
                      e.preventDefault();
                      e.stopPropagation();

                      setHighlightedIndex(matchingItemIndex);
                    }
                  }

                  if (e.keyCode === KEY_CODES.LEFT && highlightedIndex !== null) {
                    e.preventDefault();
                    e.stopPropagation();

                    selectItemAtIndex(previousIndexRef.current);
                  }

                  if (e.keyCode === KEY_CODES.RIGHT) {
                    const nextItemIndexes = Object.values(nextItemsHashRef.current);

                    if (nextItemIndexes.includes(highlightedIndex)) {
                      e.preventDefault();
                      e.stopPropagation();

                      selectItemAtIndex(highlightedIndex);
                    }
                  }
                } else if (e.keyCode === KEY_CODES.ENTER || e.keyCode === KEY_CODES.SPACE) {
                  e.preventDefault();
                  e.stopPropagation();

                  openMenu();
                }
              }
            })}
          />
        </>
      )}
    </Reference>
  );
};

Trigger.propTypes = {
  children: PropTypes.func
};

export default Trigger;
