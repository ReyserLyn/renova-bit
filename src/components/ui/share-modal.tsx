'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Copy, Link } from 'lucide-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-hot-toast'
import {
	FacebookIcon,
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	TelegramIcon,
	TelegramShareButton,
	TwitterIcon,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from 'react-share'

interface ShareModalProps {
	isOpen: boolean
	onClose: () => void
	url: string
	title: string
	description?: string
}

export function ShareModal({
	isOpen,
	onClose,
	url,
	title,
	description,
}: ShareModalProps) {
	const handleCopySuccess = () => {
		toast.success('¡Enlace copiado al portapapeles!')
		onClose()
	}

	const handleCopyError = () => {
		toast.error('Error al copiar el enlace')
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="w-[96vw] max-w-full mx-auto p-3 sm:p-4">
				<DialogHeader className="space-y-1 sm:space-y-2">
					<DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
						<Link className="h-4 w-4 sm:h-5 sm:w-5" />
						Compartir producto
					</DialogTitle>
					<DialogDescription className="text-xs sm:text-sm">
						Comparte este producto con tus amigos y familiares
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 sm:space-y-6">
					<div className="grid grid-cols-3 gap-2 sm:gap-4 justify-items-center">
						<div className="flex flex-col items-center gap-1 min-w-0 w-full">
							<WhatsappShareButton url={url} title={title}>
								<WhatsappIcon size={36} round className="sm:w-10 sm:h-10" />
							</WhatsappShareButton>
							<span className="text-[8px] sm:text-[9px] text-muted-foreground text-center truncate w-full px-1">
								WhatsApp
							</span>
						</div>

						<div className="flex flex-col items-center gap-1 min-w-0 w-full">
							<FacebookShareButton url={url} hashtag="#RenovaBit">
								<FacebookIcon size={36} round className="sm:w-10 sm:h-10" />
							</FacebookShareButton>
							<span className="text-[8px] sm:text-[9px] text-muted-foreground text-center truncate w-full px-1">
								Facebook
							</span>
						</div>

						<div className="flex flex-col items-center gap-1 min-w-0 w-full">
							<TwitterShareButton url={url} title={title}>
								<TwitterIcon size={36} round className="sm:w-10 sm:h-10" />
							</TwitterShareButton>
							<span className="text-[8px] sm:text-[9px] text-muted-foreground text-center truncate w-full px-1">
								Twitter
							</span>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-2 sm:gap-4 justify-items-center max-w-[200px] mx-auto">
						<div className="flex flex-col items-center gap-1 min-w-0 w-full">
							<LinkedinShareButton
								url={url}
								title={title}
								summary={description}
							>
								<LinkedinIcon size={36} round className="sm:w-10 sm:h-10" />
							</LinkedinShareButton>
							<span className="text-[8px] sm:text-[9px] text-muted-foreground text-center truncate w-full px-1">
								LinkedIn
							</span>
						</div>

						<div className="flex flex-col items-center gap-1 min-w-0 w-full">
							<TelegramShareButton url={url} title={title}>
								<TelegramIcon size={36} round className="sm:w-10 sm:h-10" />
							</TelegramShareButton>
							<span className="text-[8px] sm:text-[9px] text-muted-foreground text-center truncate w-full px-1">
								Telegram
							</span>
						</div>
					</div>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-[10px] sm:text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								O copia el enlace
							</span>
						</div>
					</div>

					<div className="space-y-2 sm:space-y-3">
						<div className="w-full px-2 py-2 sm:px-3 border rounded-md bg-muted/50 text-[10px] sm:text-xs text-muted-foreground overflow-hidden">
							<div className="truncate break-all">{url}</div>
						</div>
						<CopyToClipboard
							text={url}
							onCopy={(text: string, result: boolean) => {
								if (result) {
									handleCopySuccess()
								} else {
									handleCopyError()
								}
							}}
						>
							<Button size="sm" className="w-full gap-2 text-xs sm:text-sm">
								<Copy className="h-3 w-3 sm:h-4 sm:w-4" />
								Copiar enlace
							</Button>
						</CopyToClipboard>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
