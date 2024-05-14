import * as S from './CardImage.css';

import { forwardRef } from 'react';
import { Box } from '..';
import type { CardProps } from './types/card';

export interface Props extends CardProps {}

export const CardMedia = forwardRef<HTMLDivElement, Props>(
	({ children, ...restProps }, ref?) => {
		return (
			<Box
				as='div'
				position='relative'
				className={S.wrapper}
				ref={ref}
				{...restProps}
			>
				{children}
			</Box>
		);
	},
);
