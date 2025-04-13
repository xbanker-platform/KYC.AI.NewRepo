# Data Fetching Solution

This module provides a robust solution for handling data fetching states in React components.

## Features

- Handles all common data fetching states: loading, success, empty, error, and idle
- Provides a reusable hook for custom implementations 
- Includes a ready-to-use container component with default UI for each state
- Supports refetching and state reset 
- Fully typed with TypeScript

## Core Files

- `useDataFetching.ts` - The core hook for managing data fetching states
- `DataFetchingContainer.tsx` - A container component that uses the hook with built-in UI components

## Usage Examples

### Basic Usage with DataFetchingContainer

The simplest way to use this solution is with the `DataFetchingContainer` component:

```tsx
import DataFetchingContainer from '@/components/DataFetchingContainer';
import { fetchUsers } from '@/services/api';

function UserList() {
  const renderUsers = (users) => (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );

  return (
    <DataFetchingContainer
      fetchFn={fetchUsers}
      renderSuccess={renderUsers}
      loadingMessage="Loading users..."
      emptyMessage="No users found"
      errorTitle="Failed to load users"
    />
  );
}
```

### Advanced Usage with Custom Hook

For more control, you can use the `useDataFetching` hook directly:

```tsx
import { useDataFetching } from '@/hooks/useDataFetching';
import { fetchUsers } from '@/services/api';

function UserListAdvanced() {
  const { data, status, error, refetch } = useDataFetching(fetchUsers);

  if (status === 'loading') {
    return <div>Loading users...</div>;
  }

  if (status === 'error') {
    return (
      <div>
        <p>Error: {error?.message}</p>
        <button onClick={refetch}>Try Again</button>
      </div>
    );
  }

  if (status === 'empty') {
    return <div>No users found.</div>;
  }

  return (
    <div>
      <ul>
        {data?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

## API Reference

### useDataFetching<T>

```tsx
function useDataFetching<T>(
  fetchFn: () => Promise<T>,
  initialFetch = true
): UseDataFetchingResult<T>
```

#### Parameters:

- `fetchFn`: A function that returns a Promise that resolves to the data
- `initialFetch`: (Optional) Boolean to control whether to fetch data on mount, defaults to `true`

#### Returns:

- `data`: The fetched data or null
- `status`: Current fetch status ('idle' | 'loading' | 'success' | 'error' | 'empty')
- `error`: Error object if status is 'error', otherwise null
- `refetch`: Function to manually trigger a refetch
- `reset`: Function to reset the state to its initial values

### DataFetchingContainer<T>

```tsx
function DataFetchingContainer<T>({
  fetchFn,
  renderSuccess,
  renderLoading,
  renderEmpty,
  renderError,
  initialFetch,
  loadingMessage,
  emptyMessage,
  errorTitle,
}: DataFetchingContainerProps<T>)
```

#### Props:

- `fetchFn`: Function to fetch data
- `renderSuccess`: Function to render the component when data is successfully fetched
- `renderLoading`: (Optional) Custom loading component
- `renderEmpty`: (Optional) Custom empty component
- `renderError`: (Optional) Custom error component
- `initialFetch`: (Optional) Whether to fetch data on mount
- `loadingMessage`: (Optional) Message to display during loading
- `emptyMessage`: (Optional) Message to display when no data is found
- `errorTitle`: (Optional) Title for the error message

## Demo Pages

Check out the demo pages to see the solution in action:

- `/demo/data-fetching` - Basic demo with `DataFetchingContainer`
- `/demo/custom-data-fetching` - Advanced demo with `useDataFetching` hook

## Extensibility

This solution is designed to be easily extended:
- Add additional states by extending the `FetchStatus` type
- Customize the UI for each state with your own components
- Add new features like pagination by wrapping the hook in your own custom hook 