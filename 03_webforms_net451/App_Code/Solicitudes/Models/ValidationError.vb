Public Class ValidationError
    Public Sub New(message As String, fieldId As String, step As Integer)
        Me.Message = message
        Me.FieldId = fieldId
        Me.Step = step
    End Sub

    Public Property Message As String
    Public Property FieldId As String
    Public Property Step As Integer
End Class
