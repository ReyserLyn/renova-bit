import { Input } from '@/components/ui/input'
import { SelectNative } from '@/components/ui/select-native'
import { cn } from '@/lib/utils'
import { ArrowRightIcon, SearchIcon } from 'lucide-react'
import { useId } from 'react'

export default function InputSearch({ className }: { className?: string }) {
	const id = useId()

	return (
		<div className={cn('w-full', className)}>
			<div className="flex w-full rounded-md">
				<SelectNative className="hidden md:block text-foreground bg-background border-border hover:text-foreground hover:bg-accent min-w-[120px] w-auto rounded-e-none rounded-s-md shadow-none border-e-0">
					<option value="Categorías" className="text-foreground bg-background">
						Categorías
					</option>
					<option value="Todos" className="text-foreground bg-background">
						Todos
					</option>
					<option
						value="Procesadores"
						className="text-foreground bg-background"
					>
						Procesadores
					</option>
					<option
						value="Tarjetas gráficas"
						className="text-foreground bg-background"
					>
						Tarjetas gráficas
					</option>
					<option
						value="Tarjetas de red"
						className="text-foreground bg-background"
					>
						Tarjetas de red
					</option>
					<option
						value="Almacenamiento"
						className="text-foreground bg-background"
					>
						Almacenamiento
					</option>
					<option value="Accesorios" className="text-foreground bg-background">
						Accesorios
					</option>
				</SelectNative>

				<div className="relative flex-1 w-full">
					<Input
						id={id}
						className="w-full md:border-s-0 md:rounded-s-none rounded-e-md shadow-none focus-visible:z-10 ps-9 pe-9 text-foreground bg-background border-border placeholder:text-muted-foreground"
						placeholder="Busca en toda la tienda..."
						type="search"
						autoFocus={false}
					/>

					<div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
						<SearchIcon size={16} />
					</div>

					<button
						className="text-muted-foreground hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md outline-none focus:z-10 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
						type="submit"
					>
						<ArrowRightIcon size={16} />
					</button>
				</div>
			</div>
		</div>
	)
}
