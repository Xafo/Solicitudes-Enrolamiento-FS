Public Class ListItemDto
    Public Sub New(text As String, value As String)
        Me.Text = text
        Me.Value = value
    End Sub

    Public Property Text As String
    Public Property Value As String
End Class
