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
				<SelectNative className="hidden md:block text-muted-foreground hover:text-foreground min-w-[120px] w-auto rounded-e-none rounded-s-md shadow-none border-e-0">
					<option value="Categorías">Categorías</option>
					<option value="Todos">Todos</option>
					<option value="Procesadores">Procesadores</option>
					<option value="Tarjetas gráficas">Tarjetas gráficas</option>
					<option value="Tarjetas de red">Tarjetas de red</option>
					<option value="Almacenamiento">Almacenamiento</option>
					<option value="Accesorios">Accesorios</option>
				</SelectNative>

				<div className="relative flex-1 w-full">
					<Input
						id={id}
						className="w-full md:border-s-0 md:rounded-s-none rounded-e-md shadow-none focus-visible:z-10 ps-9 pe-9"
						placeholder="Busca en toda la tienda..."
						type="search"
						autoFocus={false}
					/>

					<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
						<SearchIcon size={16} />
					</div>

					<button
						className="text-muted-foreground/80 hover:text-foreground/90 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md outline-none focus:z-10 focus-visible:ring-2 focus-visible:ring-ring/50 disabled:opacity-50"
						type="submit"
					>
						<ArrowRightIcon size={16} />
					</button>
				</div>
			</div>
		</div>
	)
}
