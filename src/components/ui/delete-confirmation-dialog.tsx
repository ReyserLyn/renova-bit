'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { AlertTriangle } from 'lucide-react'

interface DeleteConfirmationDialogProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	title?: string
	description?: string
	confirmText?: string
	cancelText?: string
	isLoading?: boolean
}

export function DeleteConfirmationDialog({
	isOpen,
	onClose,
	onConfirm,
	title = '¿Estás seguro?',
	description = 'Esta acción no se puede deshacer.',
	confirmText = 'Eliminar',
	cancelText = 'Cancelar',
	isLoading = false,
}: DeleteConfirmationDialogProps) {
	const handleConfirm = () => {
		onConfirm()
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-md">
				<DialogHeader className="space-y-3">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
							<AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" />
						</div>
						<DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
					</div>
					<DialogDescription className="text-sm text-muted-foreground">
						{description}
					</DialogDescription>
				</DialogHeader>

				<div className="flex gap-3 pt-4">
					<Button
						variant="outline"
						onClick={onClose}
						disabled={isLoading}
						className="flex-1"
					>
						{cancelText}
					</Button>
					<Button
						variant="destructive"
						onClick={handleConfirm}
						disabled={isLoading}
						className="flex-1"
					>
						{isLoading ? 'Eliminando...' : confirmText}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
