import React from 'react';

export default function Numbers({ children }) {
  return <div style={styles.flexRow}>{children}</div>;
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
};
