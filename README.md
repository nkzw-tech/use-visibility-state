# `use-visibility-state`

React to document visibility changes to pause or resume animations and tasks.

## Installation

```bash
npm install @nkzw/use-visibility-state
```

## Usage

Wrap your app using `VisibilityStateContext`:

```typescript
import { VisibilityStateContext } from '@nkzw/use-visibility-state';

const App = () => {
  return (
    <VisibilityStateContext>
      <MyComponent />
    </VisibilityStateContext>
  );
};
```

Now you can use `useVisibilityState` in your components:

```typescript
import { useVisibilityState } from '@nkzw/use-visibility-state';

const MyComponent = () => {
  const isVisible = useVisibilityState();

  return <div style={{
    animationPlayState: isVisible ? 'running' : 'paused',
  }}>
    A heavy animation.
  </div>;
};
```
