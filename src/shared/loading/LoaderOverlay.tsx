import { useLoaderStore } from './loaderStore'
import LoadingScreen from './LoadingScreen'

export default function LoaderOverlay() {
  const isLoading = useLoaderStore((s) => s.isLoading)
  return isLoading ? <LoadingScreen/> : null
}
