## Standard Menus

```jsx
const { Button } = require('@zendeskgarden/react-buttons/src');

<Grid>
  <Row>
    <Col md>
      <Dropdown onSelect={item => alert(item)}>
        <Trigger>
          {({ getTriggerProps, isOpen }) => (
            <Button {...getTriggerProps({ active: isOpen })}>Default Menu</Button>
          )}
        </Trigger>
        <Menu>
          <Item value="1 - Item">1 - Item</Item>
          <Item value="2 - Item">2 - Item</Item>
          <Item value="3 - Item">3 - Item</Item>
        </Menu>
      </Dropdown>
    </Col>
    <Col md>
      <Dropdown onSelect={item => alert(item)}>
        <Trigger>
          {({ getTriggerProps, isOpen }) => (
            <Button {...getTriggerProps({ active: isOpen, size: 'small' })}>Small Menu</Button>
          )}
        </Trigger>
        <Menu small>
          <Item value="1 - Item">1 - Item</Item>
          <Item value="2 - Item">2 - Item</Item>
          <Item value="3 - Item">3 - Item</Item>
        </Menu>
      </Dropdown>
    </Col>
  </Row>
</Grid>;
```

## Disabled Items

```jsx
const { Button } = require('@zendeskgarden/react-buttons/src');

<Dropdown onSelect={item => alert(item)}>
  <Trigger>
    {({ getTriggerProps, isOpen }) => (
      <Button {...getTriggerProps({ active: isOpen })}>Disabled Menu Items</Button>
    )}
  </Trigger>
  <Menu>
    <Item value="item-1">Item 1</Item>
    <Item disabled>Disabled</Item>
    <Item value="item-2">Item 2</Item>
    <Item value="item-3">Item 3</Item>
  </Menu>
</Dropdown>;
```

## Advanced Layout

```jsx
const { Button } = require('@zendeskgarden/react-buttons/src');

<Dropdown onSelect={item => alert(item)}>
  <Trigger>
    {({ getTriggerProps, isOpen }) => (
      <Button {...getTriggerProps({ active: isOpen })}>Advanced Layout</Button>
    )}
  </Trigger>
  <Menu placement="end" arrow>
    <HeaderItem>Header Item Text</HeaderItem>
    <Separator />
    <Item value="profile">Profile</Item>
    <Item value="settings">Settings</Item>
    <Item disabled>Theme Editor</Item>
    <Separator />
    <Item value="article-editor">Article Editor</Item>
    <Item value="logout">Logout</Item>
  </Menu>
</Dropdown>;
```

## Tree Layout

```jsx
const { Button } = require('@zendeskgarden/react-buttons/src');
const { Dots } = require('@zendeskgarden/react-loaders/src');
const { zdColorBlue600 } = require('@zendeskgarden/css-variables');

const StyledLoadingAnimation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingAnimation = () => (
  <StyledLoadingAnimation>
    <Dots size="48px" color={zdColorBlue600} delayMS={50} />
  </StyledLoadingAnimation>
);

initialState = {
  isLoading: true,
  isOpen: false,
  tempSelectedItem: undefined
};

const renderItems = () => {
  if (state.isLoading) {
    return <LoadingAnimation />;
  }

  if (state.tempSelectedItem === 'specific-settings') {
    return (
      <>
        <PreviousItem value="general-settings">Specific Settings</PreviousItem>
        <Separator />
        <Item value="cool-setting">Cool setting</Item>
        <Item value="uncool-setting">Uncool setting</Item>
        <Item value="another-setting">Another cool setting</Item>
      </>
    );
  }

  return (
    <>
      <HeaderItem>General Settings</HeaderItem>
      <Separator />
      <Item value="profile">Profile</Item>
      <Item value="settings">Settings</Item>
      <Item value="user-images">User Images</Item>
      <NextItem value="specific-settings">Specific Settings</NextItem>
      <Item value="theme-editor">Theme Editor</Item>
    </>
  );
};

<Dropdown
  isOpen={state.isOpen}
  onOpen={isOpen => {
    setState({ isOpen, isLoading: true, tempSelectedItem: undefined }, () => {
      if (isOpen) {
        setTimeout(() => {
          setState({ isLoading: false });
        }, 2000);
      }
    });
  }}
  onSelect={item => {
    setState({ tempSelectedItem: item, isLoading: true }, () => {
      setTimeout(() => {
        setState({ isLoading: false });
      }, 2000);
    });
  }}
>
  <Trigger>
    {({ getTriggerProps, isOpen }) => (
      <Button {...getTriggerProps({ active: isOpen })}>Async Tree Layout</Button>
    )}
  </Trigger>
  <Menu placement="end" arrow style={{ width: 400, height: 300 }}>
    {renderItems()}
  </Menu>
</Dropdown>;
```

## Select Example

```jsx
initialState = {
  selectedItem: 'item-1'
};

<Dropdown selectedItem={state.selectedItem} onSelect={selectedItem => setState({ selectedItem })}>
  <Menu>
    <Item value="item-1">Item 1</Item>
    <Item value="item-2">Item 2</Item>
    <Item value="item-3">Item 3</Item>
  </Menu>
</Dropdown>;
```
