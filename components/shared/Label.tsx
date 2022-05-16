import { Span } from '@components/shared/chakra';
import { memo, ReactNode } from 'react';

// eslint-disable-next-line react/display-name
export const Label = memo(
  ({ forHtml, children }: { forHtml: string; children: JSX.Element | JSX.Element[] | ReactNode }) => {
    return (
      <label htmlFor={forHtml} style={{ height: '1.875rem' }}>
        <Span fontSize={['0.875rem', '1rem', '1.125rem']}>{children}</Span>
      </label>
    );
  }
);
