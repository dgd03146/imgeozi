import { useToast } from '@jung/design-system';
import type { Photo } from '@jung/shared/types';
import { useState } from 'react';

// 공유 플랫폼 타입 정의
type SharePlatform = 'kakao' | 'x' | 'linkedin' | 'whatsapp';

export interface KakaoShareOptions {
	objectType: 'feed';
	content: {
		title: string;
		description?: string;
		imageUrl?: string;
		link: {
			mobileWebUrl: string;
			webUrl: string;
		};
	};
}

export const useSharePhoto = () => {
	const showToast = useToast();
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);
	const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

	const createShareUrl = (photo: Photo) => {
		const url = encodeURIComponent(window.location.href);
		const text = encodeURIComponent(photo.title || 'Shared Content');
		return { url, text };
	};

	const getShareLinks = (photo: Photo) => {
		const { url, text } = createShareUrl(photo);

		const handleKakaoShare = async () => {
			try {
				if (typeof window === 'undefined') return;

				if (!window.Kakao) {
					showToast('카카오톡 SDK를 불러오는 중입니다', 'error');
					return;
				}

				if (!window.Kakao.isInitialized()) {
					window.Kakao.init(
						process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY as string,
					);
				}

				if (!window.Kakao.Link) {
					showToast('카카오톡 공유 기능을 초기화중입니다', 'error');
					return;
				}

				const shareOptions: KakaoShareOptions = {
					objectType: 'feed',
					content: {
						title: photo.title || 'Shared Content',
						description: photo.description || '',
						imageUrl: photo.image_url || '',
						link: {
							mobileWebUrl: window.location.href,
							webUrl: window.location.href,
						},
					},
				};

				await window.Kakao.Link.sendDefault(shareOptions);
			} catch (error) {
				console.error('Kakao share error:', error);
				showToast('카카오톡 공유 중 오류가 발생했습니다', 'error');
			}
		};

		return {
			kakao: handleKakaoShare,
			x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
			whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
		} satisfies Record<SharePlatform, string | (() => Promise<void>)>;
	};

	const handleShare = async (photo: Photo) => {
		try {
			if (navigator.share) {
				await navigator.share({
					title: photo.title || 'Shared Content',
					text: photo.description || '',
					url: window.location.href,
				});
				return;
			}
		} catch (error) {
			if (error instanceof Error && error.name !== 'AbortError') {
				showToast('공유하기 중 오류가 발생했습니다', 'error');
			}
		}

		setSelectedPhoto(photo);
		setIsShareModalOpen(true);
	};

	const closeShareModal = () => {
		setIsShareModalOpen(false);
		setSelectedPhoto(null);
	};

	return {
		handleShare,
		setIsShareModalOpen,
		isShareModalOpen,
		selectedPhoto,
		closeShareModal,
		getShareLinks,
	} as const;
};