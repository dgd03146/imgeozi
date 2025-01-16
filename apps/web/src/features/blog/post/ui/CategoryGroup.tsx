import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { useGetCategoryCounts } from '../api';
import * as styles from './CategoryGroup.css';

interface CategoryItem {
	name: string;

	slug: string;
}

interface CategoryGroupProps {
	title: string;
	items?: CategoryItem[];
}

export const CategoryGroup = ({ title, items }: CategoryGroupProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentCat = searchParams.get('cat') || 'all';

	const { data: categoryCounts } = useGetCategoryCounts();

	const getPostCount = (slug: string) => categoryCounts?.[slug] ?? 0;

	const createQueryString = useCallback(
		(value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value === 'all') {
				params.delete('cat');
			} else {
				params.set('cat', value);
			}

			return params.toString();
		},
		[searchParams],
	);

	return (
		<div className={styles.categorySection}>
			{title === 'All' ? (
				<Link
					href={'/blog'}
					className={`${styles.categoryHeader} ${styles.categoryHeaderLink({
						active: currentCat === null,
					})}`}
				>
					<h3 className={styles.categoryTitle}>{title}</h3>
				</Link>
			) : (
				<>
					<button
						className={styles.categoryHeader}
						onClick={() => setIsOpen(!isOpen)}
						type='button'
					>
						<h3 className={styles.categoryTitle}>{title}</h3>
						<IoChevronDown
							size={16}
							className={styles.chevronIcon({ isOpen })}
							aria-hidden='true'
						/>
					</button>

					<div className={styles.categoryContent({ isOpen })}>
						<div className={styles.categoryList}>
							{items?.map((item) => (
								<Link
									key={item.slug}
									href={`${pathname}?${createQueryString(item.slug)}`}
									className={styles.categoryItem({
										active: currentCat === item.slug,
									})}
								>
									<span className={styles.categoryName}>{item.name}</span>
									<span className={styles.categoryCount}>
										{getPostCount(item.slug)}
									</span>
								</Link>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};