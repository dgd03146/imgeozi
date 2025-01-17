import clsx from 'clsx';
import { type ParamHTMLAttributes, forwardRef } from 'react';
import { Box } from '..';
import type { AtomProps } from '../../types/atoms';
import * as S from './Typography.css';

/**
 * Typography Body Text
 * @param {number} level - Body text level value
 * - level `1`: Body text 1
 * - level `2`: Body text 2
 * - level `3`: Body text 3
 * - level `4`: Body text 4
 */

export interface TextProps
	extends Omit<ParamHTMLAttributes<HTMLParagraphElement>, 'color'>,
		AtomProps {
	level?: 1 | 2 | 3 | 4;
	inline?: boolean;
	truncate?: 'none' | 'single' | 'two' | 'three';
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
	({ level = 2, inline, truncate, children, className, ...restProps }, ref) => {
		const textStyle = clsx(S.text({ level, inline, truncate }), className);

		return (
			<Box as='p' className={textStyle} ref={ref} {...restProps}>
				{children}
			</Box>
		);
	},
);
