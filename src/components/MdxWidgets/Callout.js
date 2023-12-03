import { Callout as SystemCallout, Flex } from '@maximeheckel/design-system';

const Callout = (props) => {
  const { children, ...rest } = props;

  return (
    <SystemCallout
      css={{
        marginTop: 'var(--space-3)',
      }}
      {...rest}
    >
      <Flex alignItems="start" direction="column" gap="6">
        {props.children}
      </Flex>
    </SystemCallout>
  );
};

export default Callout;