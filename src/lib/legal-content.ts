import type { LegalContent } from '@/types/legal'

// Contenido centralizado para páginas legales
export const legalContent: LegalContent = {
	termsAndConditions: {
		lastUpdated: '15 de enero de 2024',
		version: '2.0',
		sections: [
			{
				id: 'definiciones',
				title: '1. Definiciones',
				content: `
        Para efectos de estos Términos y Condiciones, se entenderá por:
        
        • **RenovaBit**: La empresa peruana dedicada a la venta de productos tecnológicos.
        • **Usuario**: Cualquier persona que accede y utiliza nuestro sitio web o servicios.
        • **Productos**: Todos los artículos tecnológicos ofrecidos en nuestra tienda.
        • **Servicio**: Todas las funcionalidades y servicios proporcionados por RenovaBit.
        • **Pedido**: Solicitud de compra realizada por un usuario a través de nuestros canales.
      `,
			},
			{
				id: 'aceptacion',
				title: '2. Aceptación de los Términos',
				content: `
        Al acceder y utilizar los servicios de RenovaBit, usted acepta automáticamente estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
        
        Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en nuestro sitio web.
      `,
			},
			{
				id: 'productos-precios',
				title: '3. Productos y Precios',
				content: `
        **Disponibilidad de Productos:**
        • Los productos están sujetos a disponibilidad en stock.
        • Nos reservamos el derecho de limitar las cantidades de compra.
        • Las imágenes son referenciales y pueden diferir del producto real.
        
        **Precios:**
        • Todos los precios están expresados en Soles Peruanos (PEN).
        • Los precios incluyen IGV cuando corresponda.
        • Nos reservamos el derecho de modificar precios sin previo aviso.
        • Los precios válidos son los mostrados al momento de la compra.
      `,
			},
			{
				id: 'proceso-compra',
				title: '4. Proceso de Compra',
				content: `
        **Realización de Pedidos:**
        • Los pedidos pueden realizarse vía WhatsApp, email o contacto directo.
        • Todo pedido está sujeto a confirmación de disponibilidad.
        • El contrato de compra se perfecciona con nuestra confirmación del pedido.
        
        **Métodos de Pago:**
        • Transferencias bancarias (BCP, Interbank, BBVA)
        • Pagos móviles (Yape, Plin)
        • Efectivo en entregas locales
        • Otros métodos según disponibilidad
      `,
			},
			{
				id: 'envios-entregas',
				title: '5. Envíos y Entregas',
				content: `
        **Política de Envíos:**
        • Delivery gratuito los fines de semana en Moquegua.
        • Envíos a otras ciudades con costo adicional según destino.
        • Los tiempos de entrega son estimados, no garantizados.
        
        **Responsabilidades:**
        • El usuario debe verificar el estado del producto al recibirlo.
        • Cualquier reclamo por daños debe reportarse inmediatamente.
        • RenovaBit no se hace responsable por direcciones incorrectas proporcionadas por el cliente.
      `,
			},
			{
				id: 'garantias',
				title: '6. Garantías',
				content: `
        **Garantía de Productos:**
        • Todos los productos nuevos cuentan con garantía del fabricante.
        • Los períodos de garantía varían según el producto y fabricante.
        • La garantía cubre defectos de fabricación, no daños por mal uso.
        
        **Exclusiones:**
        • Daños por agua, caídas o mal manejo.
        • Productos modificados o reparados por terceros.
        • Desgaste normal por uso.
        • Software y licencias (sujeto a términos del fabricante).
      `,
			},
			{
				id: 'uso-sitio',
				title: '7. Uso del Sitio Web',
				content: `
        **Uso Permitido:**
        • El sitio web es para uso personal y comercial legítimo.
        • Está prohibido el uso automatizado o masivo sin autorización.
        • No se permite la reproducción de contenido sin permiso.
        
        **Restricciones:**
        • No interferir con el funcionamiento del sitio.
        • No intentar acceder a áreas restringidas.
        • No utilizar el sitio para actividades ilegales o fraudulentas.
      `,
			},
			{
				id: 'privacidad',
				title: '8. Privacidad y Datos Personales',
				content: `
        **Protección de Datos:**
        • Cumplimos con la Ley de Protección de Datos Personales del Perú.
        • Los datos recopilados se utilizan únicamente para procesar pedidos y mejorar nuestro servicio.
        • No compartimos información personal con terceros sin consentimiento.
        
        **Derechos del Usuario:**
        • Acceso, rectificación y cancelación de datos personales.
        • Oposición al tratamiento de datos para fines comerciales.
        • Para ejercer estos derechos, contactar a: info@renovabit.com
      `,
			},
			{
				id: 'limitaciones',
				title: '9. Limitaciones de Responsabilidad',
				content: `
        **Limitaciones:**
        • RenovaBit no será responsable por daños indirectos o consecuenciales.
        • Nuestra responsabilidad máxima se limita al valor del producto vendido.
        • No garantizamos la disponibilidad ininterrumpida del sitio web.
        
        **Fuerza Mayor:**
        • No seremos responsables por incumplimientos debido a causas de fuerza mayor.
        • Incluye desastres naturales, huelgas, problemas de suministro, etc.
      `,
			},
			{
				id: 'propiedad',
				title: '10. Propiedad Intelectual',
				content: `
        **Derechos de Autor:**
        • Todo el contenido del sitio web es propiedad de RenovaBit o sus licenciantes.
        • Las marcas comerciales pertenecen a sus respectivos propietarios.
        • El uso no autorizado está prohibido y puede resultar en acciones legales.
        
        **Licencias:**
        • Otorgamos una licencia limitada para usar el sitio web según estos términos.
        • Esta licencia no incluye derechos de reventa o distribución comercial.
      `,
			},
			{
				id: 'legislacion',
				title: '11. Legislación Aplicable',
				content: `
        **Jurisdicción:**
        • Estos términos se rigen por las leyes de la República del Perú.
        • Cualquier disputa será resuelta en los tribunales de Moquegua, Perú.
        
        **Resolución de Conflictos:**
        • Preferimos resolver conflictos mediante negociación directa.
        • En caso de no llegar a un acuerdo, se recurrirá a la vía judicial correspondiente.
      `,
			},
			{
				id: 'contacto',
				title: '12. Información de Contacto',
				content: `
        Para consultas sobre estos Términos y Condiciones, puede contactarnos:
        
        **RenovaBit**
        • Email: info@renovabit.com
        • WhatsApp: +51 987 471 074
        • Dirección: Moquegua, Perú
        
        **Horarios de Atención:**
        • Lunes a Sábado: 9:00 AM - 7:00 PM
        • Domingo: 10:00 AM - 2:00 PM
      `,
			},
		],
	},
	privacyPolicy: {
		lastUpdated: '15 de enero de 2024',
		version: '2.0',
		sections: [
			{
				id: 'introduccion',
				title: '1. Introducción',
				content: `
        En RenovaBit, respetamos y protegemos la privacidad de nuestros usuarios. Esta Política de Privacidad explica cómo recopilamos, utilizamos, almacenamos y protegemos su información personal cuando utiliza nuestros servicios.
        
        **Compromiso:**
        • Cumplimos con la Ley de Protección de Datos Personales del Perú (Ley N° 29733).
        • Implementamos medidas de seguridad técnicas y organizativas.
        • Respetamos sus derechos sobre sus datos personales.
        • Actuamos con transparencia en el tratamiento de sus datos.
      `,
			},
			{
				id: 'responsable',
				title: '2. Responsable del Tratamiento',
				content: `
        **RenovaBit** es el responsable del tratamiento de sus datos personales.
        
        **Datos de Contacto:**
        • Razón Social: RenovaBit
        • Dirección: Moquegua, Perú
        • Email: info@renovabit.com
        • Teléfono: +51 987 471 074
        
        **Delegado de Protección de Datos:**
        Para consultas relacionadas con privacidad: privacidad@renovabit.com
      `,
			},
			{
				id: 'datos-recopilados',
				title: '3. Datos que Recopilamos',
				content: `
        **Datos de Identificación:**
        • Nombre completo
        • Documento de identidad (DNI)
        • Fecha de nacimiento
        • Nacionalidad
        
        **Datos de Contacto:**
        • Dirección postal
        • Número de teléfono
        • Dirección de email
        • Redes sociales
        
        **Datos de Navegación:**
        • Dirección IP
        • Tipo de navegador
        • Páginas visitadas
        • Tiempo de permanencia
        • Cookies y tecnologías similares
        
        **Datos Comerciales:**
        • Historial de compras
        • Preferencias de productos
        • Métodos de pago utilizados
        • Comunicaciones comerciales
      `,
			},
			{
				id: 'finalidades',
				title: '4. Finalidades del Tratamiento',
				content: `
        **Gestión Comercial:**
        • Procesamiento de pedidos y ventas
        • Gestión de pagos y facturación
        • Atención al cliente y soporte técnico
        • Gestión de garantías y devoluciones
        
        **Marketing y Comunicación:**
        • Envío de ofertas y promociones
        • Newsletter y comunicaciones comerciales
        • Encuestas de satisfacción
        • Publicidad personalizada
        
        **Cumplimiento Legal:**
        • Cumplimiento de obligaciones fiscales
        • Archivo de documentos legales
        • Cooperación con autoridades competentes
        
        **Mejora de Servicios:**
        • Análisis de comportamiento de usuarios
        • Optimización del sitio web
        • Desarrollo de nuevos productos
        • Investigación de mercado
      `,
			},
			{
				id: 'base-legal',
				title: '5. Base Legal del Tratamiento',
				content: `
        **Ejecución de Contrato:**
        • Procesamiento de pedidos
        • Prestación de servicios contratados
        • Gestión de pagos
        
        **Interés Legítimo:**
        • Mejora de productos y servicios
        • Seguridad del sitio web
        • Prevención de fraudes
        
        **Consentimiento:**
        • Marketing directo
        • Cookies no esenciales
        • Comunicaciones promocionales
        
        **Cumplimiento Legal:**
        • Obligaciones fiscales
        • Requerimientos legales
        • Archivo de documentos
      `,
			},
			{
				id: 'compartir-datos',
				title: '6. Compartir Datos',
				content: `
        **Con Terceros Autorizados:**
        • Proveedores de servicios de pago (bancos, pasarelas de pago)
        • Empresas de logística y entrega
        • Proveedores de servicios tecnológicos
        • Asesores legales y contables
        
        **Transferencias Internacionales:**
        Cuando sea necesario, podemos transferir datos fuera del Perú únicamente a países con nivel de protección adecuado o con las garantías apropiadas.
        
        **Nunca Compartimos:**
        • No vendemos datos personales a terceros
        • No compartimos con fines comerciales sin consentimiento
        • No cedemos datos para marketing de terceros sin autorización
      `,
			},
			{
				id: 'seguridad',
				title: '7. Medidas de Seguridad',
				content: `
        **Medidas Técnicas:**
        • Cifrado SSL/TLS en todas las comunicaciones
        • Sistemas de firewall y protección contra intrusiones
        • Copias de seguridad regulares y cifradas
        • Control de acceso basado en roles
        
        **Medidas Organizativas:**
        • Políticas internas de protección de datos
        • Formación regular del personal
        • Auditorías de seguridad periódicas
        • Procedimientos de respuesta ante incidentes
        
        **Acceso Restringido:**
        Solo el personal autorizado tiene acceso a datos personales y únicamente cuando es necesario para sus funciones laborales.
      `,
			},
			{
				id: 'retencion',
				title: '8. Retención de Datos',
				content: `
        **Criterios de Retención:**
        • Mientras sea necesario para las finalidades del tratamiento
        • Durante el tiempo requerido por obligaciones legales
        • Hasta que ejercite sus derechos de supresión
        
        **Períodos Específicos:**
        • Datos comerciales: 5 años desde la última compra
        • Datos fiscales: 4 años según legislación peruana
        • Datos de marketing: hasta la retirada del consentimiento
        • Datos de navegación: 2 años desde la última visita
        
        **Eliminación Segura:**
        Una vez vencidos los períodos de retención, procedemos a la eliminación segura de los datos.
      `,
			},
			{
				id: 'derechos',
				title: '9. Derechos del Titular',
				content: `
        **Derecho de Acceso:**
        Puede solicitar información sobre qué datos personales tratamos sobre usted.
        
        **Derecho de Rectificación:**
        Puede solicitar la corrección de datos inexactos o incompletos.
        
        **Derecho de Supresión:**
        Puede solicitar la eliminación de sus datos personales en determinadas circunstancias.
        
        **Derecho de Limitación:**
        Puede solicitar la limitación del tratamiento de sus datos.
        
        **Derecho de Oposición:**
        Puede oponerse al tratamiento de sus datos, especialmente para marketing directo.
        
        **Derecho de Portabilidad:**
        Puede solicitar recibir sus datos en formato estructurado y portable.
        
        **Ejercicio de Derechos:**
        Para ejercer estos derechos, contacte: info@renovabit.com
      `,
			},
			{
				id: 'cookies',
				title: '10. Cookies y Tecnologías Similares',
				content: `
        **Tipos de Cookies:**
        • **Esenciales:** Necesarias para el funcionamiento del sitio
        • **Funcionales:** Mejoran la experiencia de usuario
        • **Analíticas:** Nos ayudan a entender el uso del sitio
        • **Publicitarias:** Personalizan la publicidad mostrada
        
        **Control de Cookies:**
        Puede gestionar las preferencias de cookies a través de la configuración de su navegador o nuestra herramienta de gestión de cookies.
        
        **Tecnologías Similares:**
        También utilizamos píxeles de seguimiento, balizas web y tecnologías similares para los mismos fines que las cookies.
      `,
			},
			{
				id: 'menores',
				title: '11. Menores de Edad',
				content: `
        **Protección de Menores:**
        • No recopilamos datos de menores de 14 años sin consentimiento parental
        • Para menores entre 14-18 años, requerimos autorización de tutores legales
        • Implementamos verificaciones de edad apropiadas
        
        **Derechos Especiales:**
        Los menores y sus representantes legales tienen derechos adicionales sobre el tratamiento de datos personales.
      `,
			},
			{
				id: 'cambios',
				title: '12. Cambios en la Política',
				content: `
        **Notificación de Cambios:**
        • Le notificaremos cambios significativos por email
        • Los cambios se publican en nuestro sitio web
        • La fecha de última actualización se indica claramente
        
        **Aceptación:**
        El uso continuado de nuestros servicios tras los cambios constituye aceptación de la nueva política.
      `,
			},
			{
				id: 'contacto-privacidad',
				title: '13. Contacto para Temas de Privacidad',
				content: `
        **Delegado de Protección de Datos:**
        • Email: privacidad@renovabit.com
        • Teléfono: +51 987 471 074
        • Dirección: Moquegua, Perú
        
        **Autoridad de Control:**
        Si considera que no hemos tratado adecuadamente sus datos, puede contactar a la Autoridad Nacional de Protección de Datos Personales del Perú.
      `,
			},
		],
	},
}
