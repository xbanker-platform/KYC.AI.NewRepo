import React, { ReactNode } from 'react';
import { Spin, Result, Button } from 'antd';
import { useDataFetching, FetchStatus } from '@/hooks/useDataFetching';

interface DataFetchingContainerProps<T> {
  // Function to fetch the data
  fetchFn: () => Promise<T>;
  
  // Function to render the component when data is successfully fetched
  renderSuccess: (data: T) => ReactNode;
  
  // Custom components for different states (optional)
  renderLoading?: () => ReactNode;
  renderEmpty?: () => ReactNode;
  renderError?: (error: Error | null, retry: () => void) => ReactNode;
  
  // Whether to fetch data on mount
  initialFetch?: boolean;
  
  // Additional options
  loadingMessage?: string;
  emptyMessage?: string;
  errorTitle?: string;
}

function DataFetchingContainer<T>({
  fetchFn,
  renderSuccess,
  renderLoading,
  renderEmpty,
  renderError,
  initialFetch = true,
  loadingMessage = 'Loading data...',
  emptyMessage = 'No data available',
  errorTitle = 'Error',
}: DataFetchingContainerProps<T>) {
  // Use our custom hook
  const { data, status, error, refetch } = useDataFetching<T>(fetchFn, initialFetch);

  // Default loading component
  const defaultLoading = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
      <Spin tip={loadingMessage} size="large" />
    </div>
  );

  // Default empty component
  const defaultEmpty = () => (
    <Result
      status="info"
      title={emptyMessage}
      extra={
        <Button type="primary" onClick={refetch}>
          Refresh
        </Button>
      }
    />
  );

  // Default error component
  const defaultError = (err: Error | null, retry: () => void) => (
    <Result
      status="error"
      title={errorTitle}
      subTitle={err?.message || 'An unknown error occurred'}
      extra={
        <Button type="primary" onClick={retry}>
          Try Again
        </Button>
      }
    />
  );

  // Render content based on status
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return renderLoading ? renderLoading() : defaultLoading();
      case 'success':
        return data ? renderSuccess(data) : null;
      case 'empty':
        return renderEmpty ? renderEmpty() : defaultEmpty();
      case 'error':
        return renderError ? renderError(error, refetch) : defaultError(error, refetch);
      case 'idle':
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
}

export default DataFetchingContainer; 