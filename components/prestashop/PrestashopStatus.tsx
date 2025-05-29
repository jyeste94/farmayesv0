"use client"

import { usePrestashopData } from "./PrestashopDataProvider"
import { Button } from "@/components/ui/button"
import { RefreshCw, CheckCircle, XCircle } from "lucide-react"

export function PrestashopStatus() {
  const { isLoading, error, lastUpdated, refreshData } = usePrestashopData()

  const formatDate = (date: Date | null) => {
    if (!date) return "Nunca"
    return new Intl.DateTimeFormat("es", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date)
  }

  return (
    <div className="flex items-center justify-between p-2 text-sm border rounded-md bg-gray-50">
      <div className="flex items-center gap-2">
        {error ? <XCircle className="h-4 w-4 text-red-500" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
        <span>
          PrestaShop: {error ? "Error" : "Conectado"} • Última actualización: {formatDate(lastUpdated)}
        </span>
      </div>
      <Button variant="ghost" size="sm" onClick={() => refreshData()} disabled={isLoading} className="h-7 px-2">
        <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? "animate-spin" : ""}`} />
        {isLoading ? "Actualizando..." : "Actualizar"}
      </Button>
    </div>
  )
}
