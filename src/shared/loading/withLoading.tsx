import { useLoaderStore } from './loaderStore'

/**
 * Envuelve una promesa con control de pantalla de carga global.
 * Se puede usar en cualquier componente o servicio.
 */
export async function withLoading<T>(promise: Promise<T>): Promise<T> {
  const { setLoading } = useLoaderStore.getState()
  try {
    setLoading(true)
    return await promise
  } finally {
    setLoading(false)
  }
}
