'use client'

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { ComponentStep } from '@/types/quotation'
import { motion } from 'framer-motion'
import { CheckIcon, CircleIcon, SkipForwardIcon } from 'lucide-react'

interface QuotationStepperProps {
	steps: ComponentStep[]
	currentStep: number
	completedSteps: Set<number>
	skippedSteps: Set<number>
	onStepClick: (step: number) => void
	className?: string
	forceDesktopLayout?: boolean
}

export function QuotationStepper({
	steps,
	currentStep,
	completedSteps,
	skippedSteps,
	onStepClick,
	className,
	forceDesktopLayout = false,
}: QuotationStepperProps) {
	return (
		<div className={cn('w-full space-y-6', className)}>
			{/* Stepper vertical - Desktop */}
			<div className={cn('hidden md:block', forceDesktopLayout && 'block')}>
				<div className="space-y-1">
					{steps.map((step, index) => {
						const stepNumber = index + 1
						const isCompleted = completedSteps.has(stepNumber)
						const isSkipped = skippedSteps.has(stepNumber)
						const isCurrent = currentStep === stepNumber

						return (
							<motion.div
								key={step.id}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.05 }}
								className={cn(
									'flex items-center gap-3 p-3 rounded-lg transition-all duration-200',
									'cursor-pointer hover:bg-accent/50',
									isCurrent && 'bg-primary/10 border border-primary/20',
									isCompleted &&
										!isCurrent &&
										'bg-green-50 dark:bg-green-950/20',
									isSkipped && 'bg-muted/50',
								)}
								onClick={() => onStepClick(stepNumber)}
							>
								{/* Indicador del paso */}
								<div
									className={cn(
										'flex items-center justify-center min-w-8 h-8 rounded-full text-sm font-bold transition-all duration-200',
										isCurrent &&
											'bg-primary text-primary-foreground shadow-md scale-110',
										isCompleted && !isCurrent && 'bg-green-500 text-white',
										isSkipped && 'bg-muted text-muted-foreground',
										!isCompleted &&
											!isCurrent &&
											!isSkipped &&
											'bg-muted text-muted-foreground',
									)}
								>
									{isCompleted ? (
										<CheckIcon className="h-4 w-4" />
									) : isSkipped ? (
										<SkipForwardIcon className="h-4 w-4" />
									) : (
										stepNumber
									)}
								</div>

								{/* Información del paso */}
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-1">
										<Tooltip>
											<TooltipTrigger>
												<span className="text-lg cursor-pointer">
													{step.icon}
												</span>
											</TooltipTrigger>
											<TooltipContent>
												<p>{step.name}</p>
											</TooltipContent>
										</Tooltip>
										<Tooltip>
											<TooltipTrigger className="flex-1 min-w-0">
												<h3
													className={cn(
														'font-medium text-sm truncate cursor-pointer text-left',
														isCurrent && 'text-primary font-semibold',
														isCompleted &&
															!isCurrent &&
															'text-green-700 dark:text-green-400',
														isSkipped && 'text-muted-foreground line-through',
													)}
												>
													{step.name}
												</h3>
											</TooltipTrigger>
											<TooltipContent>
												<p>{step.name}</p>
											</TooltipContent>
										</Tooltip>
										{step.isOptional && (
											<span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 px-1.5 py-0.5 rounded flex-shrink-0">
												Opc.
											</span>
										)}
									</div>
									<p
										className={cn(
											'text-xs text-muted-foreground truncate',
											isSkipped && 'line-through',
										)}
									>
										{step.description}
									</p>
								</div>

								{/* Estado visual */}
								<div className="flex items-center gap-1">
									{isCurrent && (
										<motion.div
											animate={{ scale: [1, 1.2, 1] }}
											transition={{
												repeat: Number.POSITIVE_INFINITY,
												duration: 2,
											}}
											className="w-2 h-2 bg-primary rounded-full"
										/>
									)}
									{isCompleted && !isCurrent && (
										<div className="w-2 h-2 bg-green-500 rounded-full" />
									)}
									{isSkipped && (
										<div className="w-2 h-2 bg-muted-foreground rounded-full" />
									)}
								</div>
							</motion.div>
						)
					})}
				</div>
			</div>

			{/* Información adicional */}
			<div className="space-y-3 text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
				<div className="flex items-center justify-center gap-4">
					<div className="flex items-center gap-1">
						<CircleIcon className="h-3 w-3 fill-current" />
						<span>Pendiente</span>
					</div>
					<div className="flex items-center gap-1">
						<CheckIcon className="h-3 w-3 text-green-500" />
						<span>Completado</span>
					</div>
					<div className="flex items-center gap-1">
						<SkipForwardIcon className="h-3 w-3 text-muted-foreground" />
						<span>Omitido</span>
					</div>
				</div>
				<div className="text-center">
					Haz clic en cualquier paso para navegar
				</div>
			</div>
		</div>
	)
}
