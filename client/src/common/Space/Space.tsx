/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

interface SpaceProps {
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
}

export function Space({ top, right, bottom, left }: SpaceProps) {
  return (
    <div
      css={css({
        marginTop: top,
        marginRight: right,
        marginBottom: bottom,
        marginLeft: left,
      })}
      aria-hidden="true"
    />
  );
}
