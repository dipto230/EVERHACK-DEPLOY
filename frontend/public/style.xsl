<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">


  <xsl:template match="/">
    <html>
      <head>
        <title>Event Registrations</title>
      </head>

      <body style="font-family: Arial; padding: 20px;">
        <h2>Event Registrations</h2>

        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
          <tr style="background-color: #dff6ff; font-weight: bold;">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Event Title</th>
            <th>Created At</th>
          </tr>

          <xsl:for-each select="registrations/registration">
            <tr>
              <td><xsl:value-of select="id"/></td>
              <td><xsl:value-of select="name"/></td>
              <td><xsl:value-of select="email"/></td>
              <td><xsl:value-of select="phone"/></td>
              <td><xsl:value-of select="eventTitle"/></td>
              <td><xsl:value-of select="createdAt"/></td>
            </tr>
          </xsl:for-each>

        </table>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
