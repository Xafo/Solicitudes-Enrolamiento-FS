Public Class SolicitudValidationError
    Public Sub New()
    End Sub

    Public Sub New(message As String, fieldId As String)
        Me.Message = message
        Me.FieldId = fieldId
        Me.StepNumber = 1
    End Sub

    Public Sub New(message As String, fieldId As String, stepNumber As Integer)
        Me.Message = message
        Me.FieldId = fieldId
        Me.StepNumber = stepNumber
    End Sub

    Public Property Message As String
    Public Property FieldId As String
    Public Property StepNumber As Integer
End Class
