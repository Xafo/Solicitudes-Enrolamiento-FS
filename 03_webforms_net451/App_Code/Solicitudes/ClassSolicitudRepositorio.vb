Imports System
Imports System.Collections.Generic
Imports System.Web

Public Class ClassSolicitudRepositorio
    Private Shared ReadOnly OtpStore As New Dictionary(Of String, OtpData)()
    Private Shared ReadOnly OtpLock As New Object()

    Public Function EnviarSolicitud(dto As SolicitudFormularioDto) As Boolean
        Return True
    End Function

    Public Function EnviarOtpMfa(telefono As String, correo As String, usuario As String, ip As String) As MfaSendResult
        Dim result As New MfaSendResult()

        If String.IsNullOrWhiteSpace(telefono) AndAlso String.IsNullOrWhiteSpace(correo) Then
            result.Success = False
            result.ErrorMessage = "Debe registrar al menos telefono o correo para MFA."
            Return result
        End If

        Dim channel As String = If(Not String.IsNullOrWhiteSpace(telefono), "SMS", "EMAIL")
        Dim txnId = Guid.NewGuid().ToString("N")
        Dim otp = GenerarOtp()

        SyncLock OtpLock
            OtpStore(txnId) = New OtpData With {
                .OtpCode = otp,
                .ExpiresAtUtc = DateTime.UtcNow.AddMinutes(5),
                .Attempts = 0
            }
        End SyncLock

        result.Success = True
        result.TransactionId = txnId
        result.Channel = channel
        result.ExpiresInSeconds = 300

        ' TODO: reemplazar por llamada SP Oracle (SMS principal y EMAIL fallback).
        Return result
    End Function

    Public Function ValidarOtpMfa(txnId As String, otp As String, usuario As String, ip As String) As MfaValidateResult
        Dim result As New MfaValidateResult() With {
            .Success = False,
            .AttemptsRemaining = 0
        }

        If String.IsNullOrWhiteSpace(txnId) Then
            result.ErrorMessage = "No existe una transaccion OTP activa."
            Return result
        End If

        SyncLock OtpLock
            If Not OtpStore.ContainsKey(txnId) Then
                result.ErrorMessage = "OTP no encontrado o expirado."
                Return result
            End If

            Dim data = OtpStore(txnId)
            If DateTime.UtcNow > data.ExpiresAtUtc Then
                OtpStore.Remove(txnId)
                result.ErrorMessage = "OTP expirado. Solicite uno nuevo."
                Return result
            End If

            If data.Attempts >= 3 Then
                OtpStore.Remove(txnId)
                result.ErrorMessage = "OTP bloqueado por intentos excedidos."
                Return result
            End If

            If String.Equals(data.OtpCode, otp, StringComparison.Ordinal) Then
                OtpStore.Remove(txnId)
                result.Success = True
                result.AttemptsRemaining = 3 - data.Attempts
                Return result
            End If

            data.Attempts += 1
            OtpStore(txnId) = data
            result.AttemptsRemaining = Math.Max(0, 3 - data.Attempts)
            result.ErrorMessage = "OTP invalido."

            If data.Attempts >= 3 Then
                OtpStore.Remove(txnId)
                result.ErrorMessage = "OTP invalido. Se agotaron los intentos."
            End If
        End SyncLock

        Return result
    End Function

    Private Function GenerarOtp() As String
        Dim random = New Random()
        Return random.Next(0, 999999).ToString("D6")
    End Function
End Class

Public Class MfaSendResult
    Public Property Success As Boolean
    Public Property TransactionId As String
    Public Property Channel As String
    Public Property ExpiresInSeconds As Integer
    Public Property ErrorMessage As String
End Class

Public Class MfaValidateResult
    Public Property Success As Boolean
    Public Property AttemptsRemaining As Integer
    Public Property ErrorMessage As String
End Class

Friend Class OtpData
    Public Property OtpCode As String
    Public Property ExpiresAtUtc As DateTime
    Public Property Attempts As Integer
End Class
