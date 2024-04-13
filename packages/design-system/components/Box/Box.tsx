import { type Sprinkles, sprinkles } from '../../styles/sprinkles.css';

import {
	type AllHTMLAttributes,
	type ElementType,
	createElement,
	forwardRef,
} from 'react';

import clsx from 'clsx';
import * as resetStyles from '../../styles/reset.css';
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef,
} from '../../types/polymorhpic';

export interface PropstoOmit
	extends Omit<
			AllHTMLAttributes<HTMLElement>,
			| 'className'
			| 'content'
			| 'height'
			| 'translate'
			| 'color'
			| 'width'
			| 'cursor'
			| 'prefix'
			| 'suffix'
			| 'size'
		>,
		Sprinkles {
	component?: ElementType;
	className?: Parameters<typeof clsx>[0];
}

export type BoxProps<
	C extends React.ElementType,
	Props = Record<string, unknown>,
> = PolymorphicComponentPropWithRef<C, PropstoOmit & Props>;

type BoxComponent = <
	C extends React.ElementType = 'div',
	Props = Record<string, unknown>,
>(
	props: BoxProps<C, Props>,
) => React.ReactNode;

export const Box: BoxComponent = forwardRef(
	<C extends React.ElementType = 'div', Props = Record<string, unknown>>(
		{
			as,
			className,
			height,
			padding,
			paddingX,
			paddingY,
			paddingTop,
			paddingBottom,
			paddingLeft,
			paddingRight,
			margin,
			marginX,
			marginY,
			marginTop,
			marginBottom,
			marginLeft,
			marginRight,
			display,
			alignItems,
			justifyContent,
			flexDirection,
			flexWrap,
			flexGrow,
			flexShrink,
			boxSizing,
			boxShadow,
			borderColor,
			borderStyle,
			borderRadius,
			borderWidth,
			position,
			top,
			bottom,
			left,
			right,
			inset,
			background,
			color,
			width,
			zIndex,
			opacity,
			pointerEvents,
			cursor,
			textAlign,
			maxWidth,
			minWidth,
			minHeight,
			maxHeight,
			transition,
			overflow,
			// grid
			gridTemplateColumns,
			gridColumnGap,
			girdRow,
			gridColumn,
			gridRowGap,
			gridAutoColumns,
			gridAutoRows,
			gridTemplateRows,
			gap,
			columnGap,
			rowGap,
			gridColumnStart,
			gridColumnEnd,
			gridRowStart,
			gridRowEnd,

			// font
			fontSize,
			fontWeight,
			fontFamily,
			lineHeight,

			caretColor,
			outlineColor,
			outlineWidth,

			...restProps
		}: BoxProps<C, Props>,
		ref?: PolymorphicRef<C>,
	) => {
		const component: ElementType = as || 'div';
		const atomClasses = clsx(
			resetStyles.element[component as keyof typeof resetStyles.element],
			className,
			sprinkles({
				height,
				padding,
				paddingX,
				paddingY,
				paddingTop,
				paddingBottom,
				paddingLeft,
				paddingRight,
				margin,
				marginX,
				marginY,
				marginTop,
				marginBottom,
				marginLeft,
				marginRight,
				display,
				alignItems,
				justifyContent,
				flexDirection,
				flexWrap,
				flexGrow,
				flexShrink,
				boxSizing,
				boxShadow,
				borderColor,
				borderStyle,
				borderRadius,
				borderWidth,
				position,
				top,
				bottom,
				left,
				right,
				inset,
				background,
				color,
				width,
				zIndex,
				opacity,
				pointerEvents,
				cursor,
				textAlign,
				maxWidth,
				minWidth,
				transition,
				overflow,
				// grid
				gridTemplateColumns,
				gridColumnGap,
				girdRow,
				gridColumn,
				gridRowGap,
				gridAutoColumns,
				gridAutoRows,
				gridTemplateRows,
				gridColumnStart,
				gridColumnEnd,
				gridRowStart,
				gridRowEnd,

				// gap
				columnGap,
				rowGap,

				// font

				fontSize,
				fontWeight,
				fontFamily,
				lineHeight,

				caretColor,
				outlineColor,
				outlineWidth,
			}),
		);

		return createElement(component, {
			className: atomClasses,
			ref,
			...restProps,
		});
	},
);
