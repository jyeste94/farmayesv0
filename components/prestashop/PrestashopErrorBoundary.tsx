"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class PrestashopErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("PrestaShop component error:", error, errorInfo)
  }

  render() {

      return (


        this.props.fallback || (
          <Alert variant="destructive" className="my-4">
            Revisar este mensaje de error

            {/*<AlertCircle className="h-4 w-4" />*/}
            {/*<AlertTitle>Error en el componente</AlertTitle>*/}
            {/*<AlertDescription>*/}
            {/*  {this.state.error?.message || "Ha ocurrido un error al cargar los datos de PrestaShop"}*/}
            {/*  <Button*/}
            {/*    variant="link"*/}
            {/*    onClick={() => this.setState({ hasError: false, error: null })}*/}
            {/*    className="p-0 h-auto font-normal"*/}
            {/*  >*/}
            {/*    <RefreshCw className="h-3 w-3 mr-1" />*/}
            {/*    Intentar de nuevo*/}
            {/*  </Button>*/}
            {/*</AlertDescription>*/}
          </Alert>
        )
      )
  }
}
