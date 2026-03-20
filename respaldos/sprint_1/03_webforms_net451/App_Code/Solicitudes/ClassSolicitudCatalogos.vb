Imports System.Collections.Generic

Public Class ClassSolicitudCatalogos
    Public Function ObtenerTiposFormulario() As List(Of ListItemDto)
        Return New List(Of ListItemDto) From {
            New ListItemDto("Seleccione...", ""),
            New ListItemDto("SPN-F.GTP-101", "101"),
            New ListItemDto("SPN-F.GTP-61", "61"),
            New ListItemDto("SPN-F.GTP-62", "62"),
            New ListItemDto("SPN-F.GTP-63", "63"),
            New ListItemDto("SPN-F.GTP-64", "64")
        }
    End Function

    Public Function ObtenerTiposDocumento() As List(Of ListItemDto)
        Return New List(Of ListItemDto) From {
            New ListItemDto("Seleccione...", ""),
            New ListItemDto("DNI", "DNI"),
            New ListItemDto("Carnet residencia", "CR"),
            New ListItemDto("Pasaporte", "PAS")
        }
    End Function

    Public Function ObtenerPaises() As List(Of ListItemDto)
        Return New List(Of ListItemDto) From {
            New ListItemDto("Seleccione...", ""),
            New ListItemDto("Honduras", "HN")
        }
    End Function

    Public Function ObtenerDepartamentos() As List(Of ListItemDto)
        Return New List(Of ListItemDto) From {
            New ListItemDto("Seleccione...", ""),
            New ListItemDto("Francisco Morazan", "FM"),
            New ListItemDto("Cortes", "CT")
        }
    End Function

    Public Function ObtenerCiudades() As List(Of ListItemDto)
        Return New List(Of ListItemDto) From {
            New ListItemDto("Seleccione...", ""),
            New ListItemDto("Tegucigalpa", "TGU"),
            New ListItemDto("San Pedro Sula", "SPS")
        }
    End Function

    Public Function ObtenerMunicipios() As List(Of ListItemDto)
        Return New List(Of ListItemDto) From {
            New ListItemDto("Seleccione...", ""),
            New ListItemDto("Distrito Central", "DC"),
            New ListItemDto("San Pedro Sula", "SPS")
        }
    End Function
End Class
